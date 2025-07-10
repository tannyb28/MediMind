# app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime
from app.schemas import Patient, TokenResponse
from app.crud import create_patient, get_patient

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Treat form_data.username as the patient's email
    patient = await get_patient(form_data.username)
    if not patient:
        # no patient with that email → unauthorized
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # success! echo back their email as the token
    return {"access_token": patient.email, "token_type": "bearer"}
