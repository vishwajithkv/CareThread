import { useState, useEffect } from "react";
import { Check, ChevronDown, Clock, GrabIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { Avatar } from "./Avatar";
import { LogCard } from "./LogCard";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selected, setSelected] = useState<Patient | null>(null);
  const [logs, setLogs] = useState<Observation[]>([]);

  // Fetch patients on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/patients/")
      .then((res) => res.json())
      .then((data: Patient[]) => {
        setPatients(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch(() => {});
  }, []);

  // Fetch logs when selected patient changes
  useEffect(() => {
    if (!selected) return;
    fetch(`http://localhost:8000/api/logs/${selected.id}`)
      .then((res) => res.json())
      .then(setLogs)
      .catch(() => {});
  }, [selected]);

  const lastLog = logs[0];
  const hasAlert = logs.some((l) => l.severity >= 4);

  const dashboardItems = [
    {
      icon: <GrabIcon className="w-4 h-4" />,
      topText: "Total",
      mainText: String(logs.length),
      bottomText: "Observation",
    },
    {
      icon: <Clock className="w-4 h-4" />,
      topText: "Last Logged",
      mainText: lastLog ? lastLog.symptom_name : "—",
      bottomText: lastLog ? `${lastLog.caretaker_name} (${lastLog.role})` : "—",
    },
  ];

  if (!selected) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <p className="text-sm text-gray-400">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Viewing Patient
      </p>

      <div className="relative mb-6 w-full sm:max-w-sm">
        {/* Trigger button */}
        <button
          id="patients"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 cursor-pointer"
        >
          <Avatar name={`${selected.first_name} ${selected.last_name}`} active showDot={hasAlert} />
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
              {selected.first_name} {selected.last_name}
            </p>
            <p className="text-xs text-gray-400">Age {selected.age}</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {/* Dropdown panel */}
        {open && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">
              All Patients
            </p>
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelected(p); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors ${selected.id === p.id ? "bg-blue-50" : ""}`}
              >
                <Avatar name={`${p.first_name} ${p.last_name}`} active={selected.id === p.id} showDot={false} />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                    {p.first_name} {p.last_name}
                  </p>
                  <p className="text-xs text-gray-400">Age {p.age}</p>
                </div>
                {selected.id === p.id && (
                  <Check className="w-4 h-4 text-blue-500 shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            topText={item.topText}
            mainText={item.mainText}
            bottomText={item.bottomText}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Observation
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {logs.length === 0 ? (
            <p className="text-sm text-gray-400">No observations recorded for this patient.</p>
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
  );
}
