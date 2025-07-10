# app/routes/devices.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas import DeviceInfo
from app.crud import get_all_devices, get_device, create_device
from app.dependencies import get_current_user

router = APIRouter(prefix="/devices", tags=["devices"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=List[DeviceInfo])
async def list_devices():
  return await get_all_devices()

@router.get("/{device_id}", response_model=DeviceInfo)
async def read_device(device_id: str):
  device = await get_device(device_id)
  if not device:
    raise HTTPException(status_code=404, detail="Device not found")
  return device

@router.post("/", response_model=DeviceInfo, status_code=201)
async def add_device(device: DeviceInfo):
  return await create_device(device)