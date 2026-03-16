from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import ChatOllama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatOllama(model="llama3")

class Query(BaseModel):
    question: str

@app.post("/ask")
def ask_question(query: Query):

    response = llm.invoke(query.question)

    return {"answer": response.content}