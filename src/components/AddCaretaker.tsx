import { useState, useEffect } from "react";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
}

export default function AddCaretaker() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("family");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/patients/")
      .then((res) => res.json())
      .then(setPatients)
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("http://localhost:8000/api/caretakers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: Number(patientId),
          first_name: fname,
          last_name: lname,
          role,
        }),
      });
      if (!res.ok) throw new Error("Failed to add caretaker");
      setMessage({ type: "success", text: "Caretaker added successfully!" });
      setPatientId("");
      setFname("");
      setLname("");
      setRole("family");
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 pt-6 md:pt-12 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 mb-6 px-1">Add Caretaker</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Patient <span className="text-slate-500 font-normal">*</span></label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
          className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 bg-white cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat"
        >
          <option value="">Select patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.last_name}
            </option>
          ))}
        </select>
        <label className="text-sm font-semibold text-slate-700 mb-1.5 mt-2">First Name <span className="text-slate-500 font-normal">*</span></label>
        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter first name" required />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Last Name <span className="text-slate-500 font-normal">*</span></label>
        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter last name" required />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Role <span className="text-slate-500 font-normal">*</span></label>
        <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-6 bg-white cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat">
          <option value="family">Family</option>
          <option value="neighbour">Neighbour</option>
          <option value="nurse">Nurse</option>
          <option value="doctor">Doctor</option>
        </select>
        {message && (
          <p className={`text-sm mb-4 ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>{message.text}</p>
        )}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-sm disabled:opacity-60">
          {loading ? "Adding..." : "Add Caretaker"}
        </button>
      </form>
    </div>
  );
}
