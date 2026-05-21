import { Users, LayoutDashboard, UserPlus, Users2, FileText, Bell } from "lucide-react";
import Button from "./Button";

const navItems = [
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", page: "dashboard" },
  { icon: <UserPlus size={20} />, text: "Add Patient", page: "add-patient" },
  { icon: <Users2 size={20} />, text: "Add Caretaker", page: "add-caretaker" },
  { icon: <FileText size={20} />, text: "Logs", page: "logs" },
  { icon: <Bell size={20} />, text: "Alerts", page: "alerts" }
]

export default function Navbar({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) {

  return (
    <nav className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 md:gap-4 md:px-6">
      <p className="flex items-center justify-center shrink-0 w-10 h-10 bg-blue-600 text-white rounded-xl">
        <Users size={20} />
      </p>

      <p className="text-[17px] font-semibold text-gray-900 md:pr-6 md:border-r border-gray-200 md:mr-auto">
        CareThread
      </p>

      {navItems.map((item, index) => (
        <Button page={item.page}
          text={item.text}
          icon={item.icon}
          index={index}
          isActive={activePage === item.page}
          onClick={() => setActivePage(item.page)}
        />
      ))}
    </nav>
  );
}