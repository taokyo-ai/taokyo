from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pathlib import Path
import os
import uuid

app = FastAPI()
BASE_DIR = Path(__file__).resolve().parent

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static folders
app.mount("/css", StaticFiles(directory=BASE_DIR / "css"), name="css")
app.mount("/js", StaticFiles(directory=BASE_DIR / "js"), name="js")
app.mount("/Images", StaticFiles(directory=BASE_DIR / "Images"), name="Images")

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is niet ingesteld")

client = OpenAI(api_key=api_key)

# Homepage
@app.get("/")
def home():
    return FileResponse(BASE_DIR / "index.html")

# API endpoint voor ChatKit
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

# Andere pagina's zoals /about of /contact
@app.get("/{page_name}")
def serve_page(page_name: str):
    file_path = BASE_DIR / f"{page_name}.html"
    if file_path.exists():
        return FileResponse(file_path)
    return FileResponse(BASE_DIR / "index.html")

# Ondersteunt ook directe .html urls
@app.get("/{page_name}.html")
def serve_html_page(page_name: str):
    file_path = BASE_DIR / f"{page_name}.html"
    if file_path.exists():
        return FileResponse(file_path)
    return FileResponse(BASE_DIR / "index.html")
