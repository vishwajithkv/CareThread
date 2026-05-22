export default function DashboardCard({ icon, topText, mainText, bottomText }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 w-full">
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-2">
                {icon}
                {topText}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {mainText}
            </div>
            <div className="text-sm text-gray-400">{bottomText}</div>
        </div>
    );
}
