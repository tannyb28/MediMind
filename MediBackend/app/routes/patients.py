# app/routes/patients.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas import Patient
from app.crud import get_patient, create_patient
from app.dependencies import get_current_user

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/me", response_model=Patient)
async def read_current_user(user: Patient = Depends(get_current_user)):
  return user

@router.post("/", response_model=Patient, status_code=201)
async def register_patient(patient: Patient):
  existing = await get_patient(patient.username)
  if existing:
    raise HTTPException(400, detail="Patient already exists")
  return await create_patient(patient)