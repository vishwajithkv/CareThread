import { useState } from "react";
import { Check, ChevronDown, Clock, GrabIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { Avatar } from "./Avatar";
import { LogCard } from "./LogCard";

const patients = [
  { id: "margret", name: "Margaret Thompson", age: 78, showDot: true },
  { id: "robert", name: "Robert Chen", age: 82, showDot: false },
  { id: "dorothy", name: "Dorothy Martinez", age: 71, showDot: false },
];

const recentObservations = [
  {
    id: 1,
    observation: "Sudden dizziness",
    observer: "Sarah (nurse)",
    note: "Patient reports feeling lightheaded and nauseous",
    time: "2 hours ago",
    severityLevel: "high",
  },
  {
    id: 2,
    observation: "Blood pressure 120/80",
    observer: "John (patient)",
    note: "No additional symptoms",
    time: "4 hours ago",
    severityLevel: "medium",
  },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(patients[0]);

  const dashboardItems = [
    {
      icon: <GrabIcon className="w-4 h-4" />,
      topText: "Total",
      mainText: "2",
      bottomText: "Observation",
    },
    {
      icon: <Clock className="w-4 h-4" />,
      topText: "Last Logged",
      mainText: "Dizziness",
      bottomText: "Sarah(nurse)",
    },
  ];

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
          <Avatar name={selected.name} active showDot={selected.showDot} />
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
              {selected.name}
            </p>
            <p className="text-xs text-gray-400">Age {selected.age}</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
              }`}
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
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors ${selected.id === p.id ? "bg-blue-50" : ""
                  }`}
              >
                <Avatar name={p.name} active={selected.id === p.id} showDot={p.showDot} />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    Age {p.age}
                    {p.showDot && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </p>
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
          <div className="grid grid-cols-1 gap-4 mt-4">
            {recentObservations.map((observation) => (
              <LogCard
                key={observation.id}
                observation={observation.observation}
                observer={observation.observer}
                note={observation.note}
                time={observation.time}
                severityLevel={observation.severityLevel}
              />
            ))}
          </div>
        </h2>
      </div>
    </div>
  );
}
