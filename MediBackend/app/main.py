# app/main.py

from fastapi import FastAPI
from app.routes import auth, chatbot, user

app = FastAPI(title="MediMind API")

# include routes
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])
app.include_router(user.router, prefix="/user", tags=["User"])

@app.get("/")
def root():
    return {"message": "Welcome to the MediMind API. Use the endpoints to interact with the chatbot and manage users."}

