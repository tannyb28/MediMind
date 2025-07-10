# app/routes/ai_pages.py
import os
from fastapi import APIRouter, HTTPException
from langchain_openai import OpenAIEmbeddings
from openai import OpenAI
from openai import APIError
import chromadb
from chromadb import PersistentClient
from chromadb.config import Settings
from ..schemas import InfoPage

router = APIRouter(prefix="/ai/pages", tags=["ai-pages"])

# Set up Chroma
chroma = PersistentClient(path=".chromadb")
collection = chroma.get_or_create_collection(
    name="inceptive_clinician_manual",
    metadata={"source": "Inceptive Clinician Manual"},
)

# Route
@router.get("/{slug}", response_model=InfoPage)
async def ai_page(slug: str):
    # 1) Ensure API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(500, "OPENAI_API_KEY not set")

    # 2) Map slug → semantic query
    query_map = {
        "device-care": "cleaning and maintenance of the implant site",
        "recharging":   "how and when to recharge the device",
        "treatment":    "overview of spinal cord stimulation therapy",
        # ...
    }
    q_text = query_map.get(slug)
    if not q_text:
        raise HTTPException(404, f"No AI recipe for slug '{slug}'")

    # 3) Embed & fetch top chunks
    embedder = OpenAIEmbeddings(model="text-embedding-3-small", openai_api_key=api_key)
    q_emb = embedder.embed_query(q_text)
    results = collection.query(query_embeddings=[q_emb], n_results=5)
    top_chunks = results["documents"][0]

    # 4) Build prompt
    system = "You are a medical-device technical writer. Produce JSON matching the InfoPage schema."
    user = f"""
Extract an InfoPage JSON for section '{slug}'.  Only return valid JSON using this Pydantic model:

{InfoPage.schema_json(indent=2)}

Here are some manual excerpts to use:
{chr(10).join(top_chunks)}
    """

    # 5) Call the LLM
    client = OpenAI(api_key=api_key)
    try:
        resp = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system},
                {"role": "user",   "content": user},
            ],
            temperature=0,
        )
    except APIError as e:
        raise HTTPException(502, f"OpenAI error: {e}")

    raw = resp.choices[0].message.content

    # 6) Validate & cache
    try:
        page = InfoPage.parse_raw(raw)
    except Exception as e:
        raise HTTPException(500, f"LLM output validation failed: {e}")

    # (optional) upsert into Mongo so you don’t rerun the LLM each time
    # await db.pages.update_one({"slug": slug}, {"$set": page.dict(by_alias=True)}, upsert=True)

    return page
