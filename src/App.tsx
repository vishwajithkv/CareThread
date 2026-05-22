import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import type { ReactNode } from "react";
import { useState } from "react";
import AddPatient from "./components/AddPatient";
import AddCaretaker from "./components/AddCaretaker";
import Log from "./components/Log";
import Alert from "./components/Alert";

function App() {
  const [activePage, setActivePage] = useState<string>("dashboard");

  const pages: Record<string, ReactNode> = {
    "dashboard": <Dashboard />,
    "add-patient": <AddPatient />,
    "add-caretaker": <AddCaretaker />,
    "logs": <Log />,
    "alerts": <Alert />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {pages[activePage]}
    </div>
  );
}

export default App;
