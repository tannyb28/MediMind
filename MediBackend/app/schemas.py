# app/schemas.py

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

# Device sub-models
class DeviceCareStep(BaseModel):
  title: str
  description: str

class DeviceCareSection(BaseModel):
  section: str
  steps: List[DeviceCareStep]

class RechargingStep(BaseModel):
  step: int
  title: str
  description: str

class RechargingGuide(BaseModel):
  schedule: str
  steps: List[RechargingStep]

class DeviceInfo(BaseModel):
  id: Optional[str] = Field(None, alias="_id")
  slug: str
  name: str
  model: str
  type: str
  device_care: List[DeviceCareSection]
  recharging_guide: RechargingGuide
  created_at: Optional[datetime]
  updated_at: Optional[datetime]

  class Config:
    allow_population_by_field_name = True
    json_encoders = {}

# Therapy sub-models
class Expectation(BaseModel):
  phase: str
  description: str

class TherapyInfo(BaseModel):
  id: Optional[str] = Field(None, alias="_id")
  device_slug: str
  name: str
  overview: str
  how_it_works: List[str]
  benefits: List[str]
  limitations: List[str]
  expectations: List[Expectation]
  created_at: Optional[datetime]
  updated_at: Optional[datetime]

  class Config:
    allow_population_by_field_name = True
    json_encoders = {}

class NameModel(BaseModel):
  first: str
  last: str
  middle: Optional[str] = None

class Patient(BaseModel):
  id: Optional[str] = Field(None, alias="_id")
  email: str
  name: NameModel
  device_id: Optional[str] = None
  therapy_id: Optional[str] = None
  implant_date: Optional[datetime] = None
  operational_unit: Optional[str] = None

class TokenResponse(BaseModel):
  access_token: str
  token_type: str