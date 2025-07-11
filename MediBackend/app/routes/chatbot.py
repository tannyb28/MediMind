import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain_openai import OpenAIEmbeddings
from openai import OpenAI, APIError
import chromadb
from pathlib import Path

# Initialize router
router = APIRouter(prefix="/chatbot", tags=["chatbot"])

# Load OpenAI key
API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise RuntimeError("OPENAI_API_KEY environment variable not set")

# 1) Embedder
embedder = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=API_KEY
)

# 2) Chroma client & collection
project_root = Path(__file__).resolve().parent.parent
chroma_dir   = project_root / ".chromadb"
chroma_client = chromadb.PersistentClient(path=str(chroma_dir))
# get_or_create ensures you never hit NotFound
collection    = chroma_client.get_or_create_collection(
    name="inceptive_data",
    metadata={"source": "Inceptive Data"}
)

# 3) Pydantic models for request and response
class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # 4) Embed the incoming question
    try:
        q_emb = embedder.embed_query(request.query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding error: {e}")

    # 5) Retrieve top 5 relevant chunks
    result = collection.query(
        query_embeddings=[q_emb],
        n_results=5
    )
    contexts = result.get("documents", [[]])[0]

    # 6) Build prompt
    system_msg = (
        "You are a medical device assistant. "
        "You specialize in Medtronic Devices, specifically Inceptive Spinal Cord Stimulators (SCS) and Percept RC Deep Brain Stimulators (DBS). "
    )
    user_msg = "Context:\n" + "\n---\n".join(contexts) + f"\n\nQuestion: {request.query}\nAnswer:"

    # 7) Call OpenAI chat completion
    client = OpenAI(api_key=API_KEY)
    try:
        resp = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user",   "content": user_msg},
            ],
            temperature=0
        )
    except APIError as e:
        raise HTTPException(status_code=502, detail=f"OpenAI API error: {e}")

    # 8) Extract answer
    try:
        answer = resp.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Invalid response format: {e}")

    return ChatResponse(answer=answer)
