from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import execute_query

router = APIRouter()

class PatientIn(BaseModel):
    first_name: str
    last_name:  str
    age:        int

@router.get("/")
def get_all_patients():
    sql = "SELECT * FROM patient ORDER BY id DESC"
    return execute_query(sql)

@router.get("/{patient_id}")
def get_patient(patient_id: int):
    sql = "SELECT * FROM patient WHERE id = %s"
    result = execute_query(sql, (patient_id,))
    if not result:
        raise HTTPException(status_code=404, detail="Patient not found")
    return result[0]

@router.post("/")
def add_patient(data: PatientIn):
    sql = """
        INSERT INTO patient (first_name, last_name, age)
        VALUES (%s, %s, %s)
        RETURNING *
    """
    result = execute_query(sql, (data.first_name, data.last_name, data.age))
    return result[0]

@router.delete("/{patient_id}")
def delete_patient(patient_id: int):
    sql = "DELETE FROM patient WHERE id = %s"
    execute_query(sql, (patient_id,), fetch=False)
    return {"message": "Patient deleted"}