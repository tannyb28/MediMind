# app/schemas.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class DeviceInfo(BaseModel):
  id: Optional[str] = Field(None, alias="_id")
  name: str
  implanted_on: Optional[datetime] = None
  replacement_interval: Optional[int] = None  # in days
  recharge_interval: Optional[int] = None  # in days
  care_instructions: Optional[str] = None

class TherapyInfo(BaseModel):
  id: Optional[str] = Field(None, alias="_id")
  device_name: str
  overview: str
  surgical_procedure: str
  follow_up_schedule: str

class Patient(BaseModel):
  id: Optional[str] = Field(None, alias="_id")
  username: str
  name: str
  device_id: Optional[str] = None
  disease_state: Optional[str] = None
  last_checkup: Optional[datetime] = None
  therapy_id: Optional[str] = None