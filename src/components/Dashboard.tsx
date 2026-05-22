import { Clock, GrabIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Viewing Patient</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Observation</h2>
            </div>
        </div>
    );
}
