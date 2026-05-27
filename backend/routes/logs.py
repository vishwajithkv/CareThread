from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from database import execute_query

router = APIRouter()

class ObservationIn(BaseModel):
    patient_id:   int
    caretaker_id: int
    symptom_name: str
    severity:     int
    notes:        Optional[str] = None

@router.get("/{patient_id}")
def get_logs(patient_id: int):
    sql = """
        SELECT
            o.id,
            o.symptom_name,
            o.severity,
            o.notes,
            o.observed_at,
            c.first_name AS caretaker_name,
            c.role
        FROM observation o
        JOIN caretaker c ON o.caretaker_id = c.id
        WHERE o.patient_id = %s
        ORDER BY o.observed_at DESC
    """
    return execute_query(sql, (patient_id,))

@router.post("/")
def add_log(data: ObservationIn):
    sql = """
        INSERT INTO observation (patient_id, caretaker_id, symptom_name, severity, notes)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
    """
    result = execute_query(
        sql,
        (data.patient_id, data.caretaker_id, data.symptom_name, data.severity, data.notes)
    )
    return result[0]