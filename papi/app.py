import os
import openai
import respond
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


# Loads the environment variables (all our secret stuff)
load_dotenv()
# Initialise Open Ai
openai.api_key = os.getenv('OPEN_AI_API_KEY')

# CORS origins
origins = [
    "https://localhost",
    "https://localhost:3000",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080"
]

# Setup api
app = FastAPI()

# Setups cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class JSON(BaseModel):
    question: str
    context: str


@app.post('/')
def response(data: JSON):
    return respond.run(data)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
