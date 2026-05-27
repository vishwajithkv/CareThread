from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import execute_query

router = APIRouter()

class CaretakerIn(BaseModel):
    patient_id: int
    first_name: str
    last_name:  str
    role:       str

@router.get("/{patient_id}")
def get_caretakers(patient_id: int):
    sql = """
        SELECT * FROM caretaker
        WHERE patient_id = %s
        ORDER BY id DESC
    """
    return execute_query(sql, (patient_id,))

@router.post("/")
def add_caretaker(data: CaretakerIn):
    sql = """
        INSERT INTO caretaker (patient_id, first_name, last_name, role)
        VALUES (%s, %s, %s, %s)
        RETURNING *
    """
    result = execute_query(
        sql,
        (data.patient_id, data.first_name, data.last_name, data.role)
    )
    return result[0]

@router.delete("/{caretaker_id}")
def delete_caretaker(caretaker_id: int):
    sql = "DELETE FROM caretaker WHERE id = %s"
    execute_query(sql, (caretaker_id,), fetch=False)
    return {"message": "Caretaker deleted"}