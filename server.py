from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import OpenAI
import os
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is niet ingesteld")

client = OpenAI(api_key=api_key)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/api/chatkit/session")
def create_chatkit_session():
    try:
        user_id = str(uuid.uuid4())

        session = client.chatkit.sessions.create({
            "workflow": {
                "id": "wf_69c6c0b9974c8190b5e27b58a8fd82ae0ab96795097afd04"
            },
            "user": user_id
        })

        return {"client_secret": session.client_secret}

    except Exception as e:
        print("SERVER ERROR:", repr(e))
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )