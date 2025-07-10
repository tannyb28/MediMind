# app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime
from app.schemas import Patient
from app.crud import create_patient, get_patient
from app.dependencies import fake_tokens

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    # Find the token string that maps to this username
    token = next((t for t, u in fake_tokens.items() if u == form.username), None)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Ensure patient record exists (same as before)…
    existing = await get_patient(form.username)
    if not existing:
        p = Patient(
            username=form.username,
            full_name=form.username.title(),
            device_id="",
            disease_state="",
            last_checkin=datetime.utcnow(),
        )
        await create_patient(p)

    return {"access_token": token, "token_type": "bearer"}