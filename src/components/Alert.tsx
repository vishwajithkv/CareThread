import { useState } from "react";
import AlertCard from "./AlertCard";

const initialAlerts = [
  {
    id: 1,
    activeAlert: true,
    patientName: "Margaret Thompson",
    pattern: "Dizziness + Blackout",
    frequency: "4 times in 7 days",
    notes: "Possible cardiovascular issue or medication side effect",
    severity: "CRITICAL" as const,
    detectedAt: "2 hours ago",
  },
  {
    id: 2,
    activeAlert: true,
    patientName: "Margaret Thompson",
    pattern: "Confusion episodes",
    frequency: "3 times in 5 days",
    notes: "Potential cognitive decline or medication interaction",
    severity: "WARNING" as const,
    detectedAt: "1 day ago",
  },
];

export default function Alert() {
  const [alerts, setAlerts] = useState(initialAlerts);

  function acknowledge(id: number) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, activeAlert: false } : a))
    );
  }

  const activeAlerts = alerts.filter((a) => a.activeAlert);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Alerts</h1>
      <p className="text-sm text-gray-500 mb-6">
        {activeAlerts.length} active alerts requiring attention
      </p>

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
