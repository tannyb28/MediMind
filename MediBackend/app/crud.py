# app/crud.py

from app.database import db
from app.schemas import DeviceInfo, TherapyInfo, Patient
from bson import ObjectId

def stringify_id(doc: dict) -> dict:
  doc["_id"] = str(doc["_id"])
  return doc

async def get_all_devices():
  cursor = db.devices.find()
  return [DeviceInfo(**stringify_id(device)) async for device in cursor]

async def get_device(device_id: str):
  device = await db.devices.find_one({"_id": ObjectId(device_id)})
  return DeviceInfo(**stringify_id(device)) if device else None

async def create_device(device: DeviceInfo):
  res = await db.devices.insert_one(device.dict(by_alias=True, exclude={"id"}))
  device.id = str(res.inserted_id)
  return device

# same pattern for therapies
async def get_all_therapies():
  cursor = db.therapies.find()
  return [TherapyInfo(**stringify_id(therapy)) async for therapy in cursor]

async def get_therapy(therapy_id: str):
  therapy = await db.therapies.find_one({"_id": ObjectId(therapy_id)})
  return TherapyInfo(**stringify_id(therapy)) if therapy else None

async def create_therapy(therapy: TherapyInfo):
  res = await db.therapies.insert_one(therapy.dict(by_alias=True, exclude={"id"}))
  therapy.id = str(res.inserted_id)
  return therapy

# same pattern for patients
async def get_patient(username: str) -> Patient | None:
  patient = await db.patients.find_one({"username": username})
  return Patient(**stringify_id(patient)) if patient else None

async def get_patient_by_id(patient_id: str) -> Patient | None:
  patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
  return Patient(**stringify_id(patient)) if patient else None

async def create_patient(patient: Patient):
  res = await db.patients.insert_one(patient.dict(by_alias=True, exclude={"id"}))
  patient.id = str(res.inserted_id)
  return patient