import { useState, useEffect } from "react";
import AlertCard from "./AlertCard";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
}

interface ApiAlert {
  disease_name: string;
  possible_concern: string;
  frequency_threshold: number;
  time_window_days: number;
  frequency: number;
}

interface AlertItem {
  id: number;
  activeAlert: boolean;
  patientName: string;
  pattern: string;
  frequency: string;
  notes: string;
  severity: "CRITICAL" | "WARNING";
  detectedAt: string;
}

export default function Alert() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<number | "">("");
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/patients/")
      .then((res) => res.json())
      .then((data: Patient[]) => {
        setPatients(data);
        if (data.length > 0) setPatientId(data[0].id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (patientId === "") return;
    const patient = patients.find((p) => p.id === patientId);
    fetch(`http://localhost:8000/api/alerts/${patientId}`)
      .then((res) => res.json())
      .then((data: ApiAlert[]) => {
        const mapped: AlertItem[] = data.map((a, i) => ({
          id: i + 1,
          activeAlert: true,
          patientName: patient ? `${patient.first_name} ${patient.last_name}` : "",
          pattern: a.disease_name,
          frequency: `${a.frequency} times in ${a.time_window_days} days`,
          notes: a.possible_concern,
          severity: Number(a.frequency) >= Number(a.frequency_threshold) * 1.5 ? "CRITICAL" : "WARNING",
          detectedAt: "recently",
        }));
        setAlerts(mapped);
      })
      .catch(() => {});
  }, [patientId, patients]);

  function acknowledge(id: number) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, activeAlert: false } : a))
    );
  }

  const activeAlerts = alerts.filter((a) => a.activeAlert);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Alerts</h1>
      <p className="text-sm text-gray-500 mb-4">
        {activeAlerts.length} active alerts requiring attention
      </p>

      {/* Patient selector */}
      <div className="mb-6 max-w-xs">
        <div className="relative">
          <select
            value={patientId}
            onChange={(e) => {
              setPatientId(Number(e.target.value));
              setAlerts([]);
            }}
            className="peer w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {activeAlerts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              activeAlert={alert.activeAlert}
              patientName={alert.patientName}
              pattern={alert.pattern}
              frequency={alert.frequency}
              notes={alert.notes}
              severity={alert.severity}
              detectedAt={alert.detectedAt}
              onAcknowledge={() => acknowledge(alert.id)}
            />
          ))}
        </div>
      ) : (
        <AlertCard
          activeAlert={false}
          patientName=""
          pattern=""
          notes=""
        />
      )}
    </div>
  );
}
