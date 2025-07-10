from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.crud import get_patient

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    # token is the email we returned above
    patient = await get_patient(token)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return patient
