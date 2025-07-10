# app/dependencies.py

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.crud import get_patient

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

# dummy token -> user mapping
fake_tokens = {
  "testtoken": "testuser",
  "admin_token": "adminuser",
  "token123": "user123"
}

async def get_current_user(token: str = Depends(oauth2_scheme)):
  """
  Dependency to get the current user based on the token.
  This is a placeholder for actual authentication logic.
  """
  username = fake_tokens.get(token)
  if not username:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid authentication credentials",
      headers={"WWW-Authenticate": "Bearer"},
    )
  
  # Here you would typically fetch the user from the database
  # For now, we just return a dummy patient object
  patient = await get_patient(username)
  if not patient:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="User not found"
    )
  
  return patient