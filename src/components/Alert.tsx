import { Bell } from "lucide-react";

export default function Alert() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Alerts</h1>
      <p className="text-sm text-gray-500 mb-6">0 active alerts requiring attention</p>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Bell className="w-14 h-14 text-gray-300 mb-4" strokeWidth={1.5} />
          <h2 className="text-base font-semibold text-gray-700">No active alerts.</h2>
          <p className="text-sm text-gray-400 mt-1">All clear! The system will notify you when patterns are detected</p>
        </div>
      </div>
    </div>
  );
}

