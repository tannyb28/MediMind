# app/routes/therapies.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas import TherapyInfo
from app.crud import get_all_therapies, get_therapy, create_therapy
from app.dependencies import get_current_user

router = APIRouter(prefix="/therapies", tags=["therapies"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=List[TherapyInfo])
async def list_therapies():
  return await get_all_therapies()

@router.get("/{therapy_id}", response_model=TherapyInfo)
async def read_therapy(therapy_id: str):
  therapy = await get_therapy(therapy_id)
  if not therapy:
    raise HTTPException(status_code=404, detail="Therapy not found")
  return therapy

@router.post("/", response_model=TherapyInfo, status_code=201)
async def add_therapy(therapy: TherapyInfo):
  return await create_therapy(therapy)