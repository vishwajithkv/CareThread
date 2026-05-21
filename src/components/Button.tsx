export default function Button({ page, text, icon, index, isActive, onClick }) {
  return (
    <a
      href={page}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      style={{ left: `${index * 20}%` }}
      className={`flex flex-col items-center justify-center gap-0.5 font-medium text-[10px] fixed bottom-0 w-1/5 h-16 z-50 bg-white border-t border-gray-100 md:static md:w-auto md:h-auto md:z-auto md:border-t-0 md:flex-row md:gap-2 md:px-4 md:py-2 md:rounded-xl md:text-sm md:transition-colors ${isActive
        ? "text-blue-600 md:bg-blue-50/80 md:text-blue-700"
        : "text-gray-500 md:text-gray-600 md:hover:bg-gray-50"
        }`}
    >
      {icon}
      {text}
    </a>
  );
}