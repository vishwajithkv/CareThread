import psycopg2
import psycopg2.extras

def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="carethread",
        user="postgres",
        password="care123"
    )

def execute_query(sql, params=None, fetch=True):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cursor.execute(sql, params)
        if fetch:
            result = cursor.fetchall()
            conn.commit()
            return [dict(row) for row in result]
        else:
            conn.commit()
            return cursor.rowcount
    finally:
        cursor.close()
        conn.close()

def init_db():
    sql_patient = """
        CREATE TABLE IF NOT EXISTS patient (
            id         SERIAL PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name  TEXT NOT NULL,
            age        INT  NOT NULL
        )
    """
    sql_caretaker = """
        CREATE TABLE IF NOT EXISTS caretaker (
            id         SERIAL PRIMARY KEY,
            patient_id INT  REFERENCES patient(id) ON DELETE CASCADE,
            first_name TEXT NOT NULL,
            last_name  TEXT NOT NULL,
            role       TEXT CHECK (role IN ('nurse','family','neighbour','doctor'))
        )
    """
    sql_known_disease = """
        CREATE TABLE IF NOT EXISTS known_disease (
            id                  SERIAL PRIMARY KEY,
            disease_name        TEXT   NOT NULL,
            symptoms            TEXT[] NOT NULL,
            frequency_threshold INT    NOT NULL,
            time_window_days    INT    NOT NULL,
            possible_concern    TEXT   NOT NULL
        )
    """
    sql_observation = """
        CREATE TABLE IF NOT EXISTS observation (
            id           SERIAL PRIMARY KEY,
            patient_id   INT  REFERENCES patient(id) ON DELETE CASCADE,
            caretaker_id INT  REFERENCES caretaker(id) ON DELETE CASCADE,
            symptom_name TEXT NOT NULL,
            severity     INT  CHECK (severity BETWEEN 1 AND 5),
            notes        TEXT,
            observed_at  TIMESTAMP DEFAULT NOW()
        )
    """
    sql_seed_check = """
        SELECT COUNT(*) as count FROM known_disease
    """

    sql_seed = """
        INSERT INTO known_disease 
            (disease_name, symptoms, frequency_threshold, time_window_days, possible_concern)
        VALUES
            ('Cardiovascular',
             ARRAY['dizziness','blackout'],
             3, 7,
             'Possible cardiovascular issue or medication side effect'),

            ('Cognitive Decline',
             ARRAY['confusion','memory loss'],
             3, 7,
             'Potential cognitive decline or medication interaction'),

            ('Heart Failure',
             ARRAY['breathlessness','swelling'],
             2, 5,
             'Possible heart failure symptoms'),

            ('Metabolic',
             ARRAY['fatigue','appetite loss'],
             4, 10,
             'Possible metabolic or nutritional concern')
    """

    execute_query(sql_patient,       fetch=False)
    execute_query(sql_caretaker,     fetch=False)
    execute_query(sql_known_disease, fetch=False)
    execute_query(sql_observation,   fetch=False)

    # Only seed if table is empty — avoids duplicates on restart
    result = execute_query(sql_seed_check)
    if result[0]['count'] == 0:
        execute_query(sql_seed, fetch=False)