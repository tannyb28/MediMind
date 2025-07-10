# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, devices, therapies, patients
from app.database import db
from datetime import datetime

app = FastAPI(title="MediMind API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.on_event("startup")
# async def seed_db():
#     # only seed devices if none exist
#     if await db.devices.count_documents({}) == 0:
#         await db.devices.insert_many([
#             {
#                 # Inceptive SCS starter device
#                 "name": "Inceptive SCS Starter Pack",
#                 "manufacturer": "Medtronic",
#                 "implanted_on": None,
#                 "replacement_interval_days": 365 * 5,    # replace every 5 years
#                 "recharge_interval_days": 7,             # recharge weekly
#                 "care_instructions": (
#                     "• Clean incision site daily\n"
#                     "• Avoid submersion in water until fully healed\n"
#                     "• Check battery status weekly\n"
#                     "• Report any redness or swelling"
#                 ),
#             },
#             {
#                 # Percept DBS starter device
#                 "name": "Percept™ PC Neurostimulator",
#                 "manufacturer": "Medtronic",
#                 "implanted_on": None,
#                 "replacement_interval_days": 365 * 7,    # replace every 7 years
#                 "recharge_interval_days": 14,            # recharge bi-weekly
#                 "care_instructions": (
#                     "• Keep incision dry for 2 weeks\n"
#                     "• Use charger pad twice per session\n"
#                     "• Schedule follow-up every 3 months\n"
#                     "• Monitor for any unexpected sensations"
#                 ),
#             },
#         ])

#     # only seed therapies if none exist
#     if await db.therapies.count_documents({}) == 0:
#         await db.therapies.insert_many([
#             {
#                 "device_name": "Inceptive SCS Starter Pack",
#                 "overview": "Spinal Cord Stimulation for chronic pain management—delivers electrical pulses to dorsal columns.",
#                 "surgical_procedure": (
#                     "1. Lead insertion at T8–T10 level\n"
#                     "2. Tunnel extension to flank pocket\n"
#                     "3. Connect lead to IPG\n"
#                     "4. Intraoperative testing for paresthesia coverage"
#                 ),
#                 "follow_up_schedule": "Initial programming 2 weeks post-op, then every 3 months",
#             },
#             {
#                 "device_name": "Percept™ PC Neurostimulator",
#                 "overview": "Deep Brain Stimulation targeting subthalamic nucleus for Parkinson’s disease symptom relief.",
#                 "surgical_procedure": (
#                     "1. Frame-based stereotactic targeting\n"
#                     "2. Bilateral lead placement in STN\n"
#                     "3. IPG pocket creation in chest wall\n"
#                     "4. Intraop microelectrode recording & test stimulation"
#                 ),
#                 "follow_up_schedule": "Programming session 1 month post-op, then bi-annual",
#             },
#         ])

# include routes
app.include_router(auth.router)
app.include_router(devices.router)
app.include_router(therapies.router)
app.include_router(patients.router)

@app.get("/")
def root():
    return {"message": "Welcome to the MediMind API. Use the endpoints to interact with the chatbot and manage users."}

