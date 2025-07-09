# app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(req: LoginRequest):
    # Dummy Check
    if req.email and req.password:
        return {
            "access_token": "dummy_token",
            "token_type": "bearer",
            "user_id": "user123"
        }
    raise HTTPException(status_code=400, detail="Invalid credentials")