export function Avatar({ name, active = false, showDot = false }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative shrink-0">
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base select-none
          ${active ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
      >
        {initials}
      </div>
      {showDot && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
      )}
    </div>
  );
}
