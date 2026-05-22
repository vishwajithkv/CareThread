import { useState } from "react";

export default function Log() {
  const [severity, setSeverity] = useState(3);

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
            <form action="">
              {/* Caregiver */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Caregiver
                </label>
                <div className="relative">
                  <select
                    name="caregiver"
                    id="caregiver"
                    className="peer w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Select caregiver</option>
                    <option value="james">James (Nurse)</option>
                    <option value="milton">Milton (Son)</option>
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
                    className="peer w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="dizziness">Dizziness</option>
                    <option value="">Blackout</option>
                    <option value="">Confusion</option>
                    <option value="">Fatigue</option>
                    <option value="">Pain</option>
                    <option value="">Nausea</option>
                    <option value="">Shortness of breath</option>
                    <option value="">Fever</option>
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
                    background: `linear-gradient(to right, #3b82f6 ${
                      ((severity - 1) / 4) * 100
                    }%, #e5e7eb ${((severity - 1) / 4) * 100}%)`,
                  }}
                  className="severity-slider"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Mild</span>
                  <span className="text-xs text-gray-400">Severe</span>
                </div>
              </div>

              {/* Submit */}
              <button
                value="submit"
                className="w-full bg-gray-300 text-gray-500 font-medium text-sm py-2.5 rounded-lg cursor-not-allowed"
                disabled
              >
                Submit Log
              </button>
            </form>
          </div>
        </div>

        {/* Recent Logs */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Recent Logs
          </h2>
        </div>
      </div>
    </div>
  );
}
