export function LogCard({ observation, observer, note, time, severityLevel }) {
    return (
        <div className="relative w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col">
                <span className="text-base font-semibold text-gray-900 pr-24">{observation}</span>
                <span className="text-sm text-gray-500 mt-0.5 pr-24">{observer}</span>
                <span className="text-sm text-gray-700 mt-2.5">{note}</span>
                <span className="text-xs text-gray-400 mt-2.5">{time}</span>
                <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {severityLevel}
                </div>
            </div>
        </div>
    );
}
