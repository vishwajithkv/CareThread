from fastapi import APIRouter
from database import execute_query

router = APIRouter()

@router.get("/{patient_id}")
def get_alerts(patient_id: int):
    sql = """
        SELECT
            kd.disease_name,
            kd.possible_concern,
            kd.frequency_threshold,
            kd.time_window_days,
            COUNT(o.id) AS frequency
        FROM known_disease kd
        JOIN observation o
            ON o.symptom_name = ANY(kd.symptoms)
            AND o.patient_id = %s
            AND o.observed_at >= NOW() - (kd.time_window_days || ' days')::interval
        GROUP BY kd.id
        HAVING COUNT(o.id) >= kd.frequency_threshold
    """
    return execute_query(sql, (patient_id,))