import { AlertCircle, Bell } from "lucide-react";

type Severity = "CRITICAL" | "WARNING";

export default function AlertCard({
    activeAlert,
    patientName,
    pattern,
    notes,
    severity,
    frequency,
    detectedAt,
    onAcknowledge,
}: {
    activeAlert: boolean;
    patientName: string;
    pattern: string;
    notes: string;
    severity?: Severity;
    frequency?: string;
    detectedAt?: string;
    onAcknowledge?: () => void;
}) {
    const isCritical = severity === "CRITICAL";

    const borderColor = isCritical ? "border-red-400" : "border-yellow-400";
    const headerBg = isCritical ? "bg-red-50" : "bg-yellow-50";
    const iconColor = isCritical ? "text-red-500" : "text-amber-500";
    const badgeClass = isCritical
        ? "bg-red-100 text-red-600"
        : "bg-yellow-100 text-amber-600";

    return (
        activeAlert ? (
            <div className={`rounded-xl border-2 ${borderColor} overflow-hidden w-full`}>

                {/* Header */}
                <div className={`${headerBg} px-4 py-3 flex items-center justify-between gap-2`}>
                    <div className="flex items-center gap-2 min-w-0">
                        <AlertCircle className={`w-5 h-5 shrink-0 ${iconColor}`} />
                        <span className="font-bold text-gray-900 text-sm sm:text-base truncate">
                            {patientName}
                        </span>
                    </div>
                    <span className={`shrink-0 text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-md ${badgeClass}`}>
                        {severity}
                    </span>
                </div>

                {/* Body */}
                <div className="bg-white px-4 pt-4 flex flex-col gap-3">
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Pattern Detected</p>
                        <p className="text-sm font-semibold text-gray-900">{pattern}</p>
                    </div>
                    {frequency && (
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Frequency</p>
                            <p className="text-sm font-semibold text-gray-900">{frequency}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Possible Concern</p>
                        <p className="text-sm font-semibold text-gray-700">{notes}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white px-4 pt-3 pb-4">
                    {detectedAt && (
                        <p className="text-xs text-gray-400 mb-3">Detected {detectedAt}</p>
                    )}
                    <button
                        onClick={onAcknowledge}
                        className="w-full bg-gray-900 hover:bg-gray-800 active:bg-gray-950 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
                    >
                        Acknowledge Alert
                    </button>
                </div>

            </div>
        ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full">
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <Bell className="w-14 h-14 text-gray-300 mb-4" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-gray-700">No active alerts.</h2>
                    <p className="text-sm text-gray-400 mt-1">All clear! The system will notify you when patterns are detected</p>
                </div>
            </div>
        )
    );
}