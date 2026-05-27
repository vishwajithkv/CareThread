import { useState, useEffect } from "react";
import { LogCard } from "./LogCard";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
}

interface Caretaker {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
}

interface Observation {
  id: number;
  symptom_name: string;
  severity: number;
  notes: string | null;
  observed_at: string;
  caretaker_name: string;
  role: string;
}

export default function Log() {
  const [severity, setSeverity] = useState(3);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<number | "">("");
  const [caretakers, setCaretakers] = useState<Caretaker[]>([]);
  const [caretakerId, setCaretakerId] = useState("");
  const [symptom, setSymptom] = useState("dizziness");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch patients on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/patients/")
      .then((res) => res.json())
      .then((data: Patient[]) => {
        setPatients(data);
        if (data.length > 0) setPatientId(data[0].id);
      })
      .catch(() => {});
  }, []);

  // Fetch caretakers and logs when patient changes
  useEffect(() => {
    if (patientId === "") return;
    fetch(`http://localhost:8000/api/caretakers/${patientId}`)
      .then((res) => res.json())
      .then((data: Caretaker[]) => {
        setCaretakers(data);
        setCaretakerId(data.length > 0 ? String(data[0].id) : "");
      })
      .catch(() => {});
    fetch(`http://localhost:8000/api/logs/${patientId}`)
      .then((res) => res.json())
      .then(setLogs)
      .catch(() => {});
  }, [patientId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (patientId === "" || !caretakerId) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("http://localhost:8000/api/logs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: Number(patientId),
          caretaker_id: Number(caretakerId),
          symptom_name: symptom,
          severity,
          notes: notes || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit log");
      setMessage({ type: "success", text: "Log submitted!" });
      setNotes("");
      // Refresh logs
      const refreshed = await fetch(`http://localhost:8000/api/logs/${patientId}`);
      setLogs(await refreshed.json());
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  function formatTime(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? "s" : ""} ago`;
  }

  function getSeverityLevel(s: number) {
    if (s >= 4) return "high";
    if (s >= 3) return "medium";
    return "low";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Logs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Log */}
        <div className="max-w-md w-full">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Add New Log
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <form onSubmit={handleSubmit}>
              {/* Patient */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Patient
                </label>
                <div className="relative">
                  <select
                    value={patientId}
                    onChange={(e) => setPatientId(Number(e.target.value))}
                    className="peer w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.first_name} {p.last_name}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform duration-200 peer-focus:rotate-180"
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

              {/* Caregiver */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Caregiver
                </label>
                <div className="relative">
                  <select
                    name="caregiver"
                    id="caregiver"
                    value={caretakerId}
                    onChange={(e) => setCaretakerId(e.target.value)}
                    className="peer w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Select caregiver</option>
                    {caretakers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.first_name} ({c.role})
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform duration-200 peer-focus:rotate-180"
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

              {/* Symptom */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Symptom
                </label>
                <div className="relative">
                  <select
                    name="symptom"
                    id="symptom"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    className="peer w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="dizziness">Dizziness</option>
                    <option value="blackout">Blackout</option>
                    <option value="confusion">Confusion</option>
                    <option value="memory loss">Memory Loss</option>
                    <option value="breathlessness">Breathlessness</option>
                    <option value="swelling">Swelling</option>
                    <option value="fatigue">Fatigue</option>
                    <option value="appetite loss">Appetite Loss</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform duration-200 peer-focus:rotate-180"
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

              {/* Severity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Severity: {severity}/5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${((severity - 1) / 4) * 100
                      }%, #e5e7eb ${((severity - 1) / 4) * 100}%)`,
                  }}
                  className="severity-slider"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Mild</span>
                  <span className="text-xs text-gray-400">Severe</span>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
                  placeholder="Add any additional notes..."
                />
              </div>

              {message && (
                <p className={`text-sm mb-3 ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>{message.text}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || patientId === "" || !caretakerId}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Log"}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Logs */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Recent Logs
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {logs.length === 0 ? (
              <p className="text-sm text-gray-400">No logs yet for this patient.</p>
            ) : (
              logs.map((obs) => (
                <LogCard
                  key={obs.id}
                  observation={obs.symptom_name}
                  observer={`${obs.caretaker_name} (${obs.role})`}
                  note={obs.notes ?? ""}
                  time={formatTime(obs.observed_at)}
                  severityLevel={getSeverityLevel(obs.severity)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
