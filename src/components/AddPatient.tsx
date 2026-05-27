import { useState } from "react";

export default function AddPatient() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("http://localhost:8000/api/patients/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: fname, last_name: lname, age: Number(age) }),
      });
      if (!res.ok) throw new Error("Failed to add patient");
      setMessage({ type: "success", text: "Patient added successfully!" });
      setFname("");
      setLname("");
      setAge("");
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 pt-6 md:pt-12 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 mb-6 px-1">Add Patient</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
        <label className="text-sm font-semibold text-slate-700 mb-1.5">First name <span className="text-slate-500 font-normal">*</span></label>
        <br className="hidden" />
        <input type="text" id="fname" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter first name" required />
        <br className="hidden" />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Last name <span className="text-slate-500 font-normal">*</span></label>
        <br className="hidden" />
        <input type="text" id="lname" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter last name" required />
        <br className="hidden" />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Age <span className="text-slate-500 font-normal">*</span></label>
        <br className="hidden" />
        <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-6 placeholder-slate-400" placeholder="Enter age" required />
        {message && (
          <p className={`text-sm mb-4 ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>{message.text}</p>
        )}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-sm disabled:opacity-60">
          {loading ? "Adding..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
}
