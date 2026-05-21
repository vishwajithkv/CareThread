export default function AddPatient() {
  return (
    <div className="w-full max-w-md mx-auto p-4 pt-6 md:pt-12 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 mb-6 px-1">Add Patient</h1>
      <form action="" className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
        <label className="text-sm font-semibold text-slate-700 mb-1.5">First name <span className="text-slate-500 font-normal">*</span></label>
        <br className="hidden" />
        <input type="text" id="fname" name="fname" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter first name" />
        <br className="hidden" />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Last name <span className="text-slate-500 font-normal">*</span></label>
        <br className="hidden" />
        <input type="text" id="lname" name="lname" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter last name" />
        <br className="hidden" />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Age <span className="text-slate-500 font-normal">*</span></label>
        <br className="hidden" />
        <input type="text" id="age" name="age" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-6 placeholder-slate-400" placeholder="Enter age" />
        <button value={"submit"} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-sm">Add Patient</button>
      </form>
    </div>
  );
}
