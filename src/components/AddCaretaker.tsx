export default function AddCaretaker() {
  return (
    <div className="w-full max-w-md mx-auto p-4 pt-6 md:pt-12 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 mb-6 px-1">Add Caretaker</h1>
      <form action="" className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Patient <span className="text-slate-500 font-normal">*</span></label>
        {/*Todo:drop down here for avail patients from db*/}
        <label className="text-sm font-semibold text-slate-700 mb-1.5 mt-2">First Name <span className="text-slate-500 font-normal">*</span></label>
        <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter first name" />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Last Name <span className="text-slate-500 font-normal">*</span></label>
        <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-4 placeholder-slate-400" placeholder="Enter last name" />
        <label className="text-sm font-semibold text-slate-700 mb-1.5">Role <span className="text-slate-500 font-normal">*</span></label>
        <select name="role" id="role" className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-6 bg-white cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat">
          <option value="family">Family</option>
          <option value="neighbour">Neighbour</option>
          <option value="nurse">Nurse</option>
        </select>
        <button value={"submit"} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-sm">Add Caretaker</button>
      </form>
    </div>
  );
}
