# app/schemas.py

from pydantic import BaseModel, Field
from typing import List, Optional
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

class AlertItem(BaseModel):
  variant: Optional[str]      # e.g. "info" or "destructive"
  icon: str                   # name of the Lucide icon, e.g. "AlertCircle"
  title: str
  description: str

class SummaryCard(BaseModel):
  title: str                  # e.g. "Battery Status"
  icon: str                   # e.g. "Battery"
  value: str                  # e.g. "85%"
  subtitle: Optional[str]     # e.g. "Estimated 7 days until recharge"

class ContentSection(BaseModel):
  heading: Optional[str]      # e.g. "Keeping the Area Clean"
  body: str                   # paragraph text

class CardSection(BaseModel):
  title: str                  # card title, e.g. "Daily Maintenance"
  description: Optional[str]  # optional subtitle/description
  content: List[ContentSection]

class Tab(BaseModel):
  key: str                    # internal slug, e.g. "overview", "alerts"
  label: str                  # displayed tab text, e.g. "Overview"
  cards: Optional[List[CardSection]]
  alerts: Optional[List[AlertItem]]

class ChecklistItem(BaseModel):
  icon: str                   # e.g. "CheckCircle2"
  title: str                  # checklist item title
  text: str                   # explanation

class TimelineEvent(BaseModel):
  icon: str                   # e.g. "Timer"
  title: str                  # e.g. "Initial Implantation"
  date: str                   # e.g. "January 2023"
  description: str

class InfoPage(BaseModel):
  slug: str                                       # e.g. "device-care"
  title: str                                      # page H1, e.g. "Device Care"
  description: str                                # subheading text

  hero_image: Optional[str] = None                # URL for a hero graphic

  alert: Optional[AlertItem] = None               # top‐of‐page alert box

  summary_cards: Optional[List[SummaryCard]] = None  # the 4‐grid cards at top of /dashboard
  tabs: Optional[List[Tab]] = None                # your Overview/Alerts/Activity or other section tabs

  checklist: Optional[List[ChecklistItem]] = None # e.g. Device Care Checklist
  timeline: Optional[List[TimelineEvent]] = None  # e.g. Replacement Timeline events