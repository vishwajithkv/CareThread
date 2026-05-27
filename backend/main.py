from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes import patients, caretakers, logs, alerts

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(patients.router,   prefix="/api/patients")
app.include_router(caretakers.router, prefix="/api/caretakers")
app.include_router(logs.router,       prefix="/api/logs")
app.include_router(alerts.router,     prefix="/api/alerts")