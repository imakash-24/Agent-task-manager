import { Menu, X } from "lucide-react";

export default function Topbar({ title, onMenuClick, isSidebarOpen }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur shadow-sm">
      <div className="flex items-center gap-3">
        {/* Toggle button (visible on mobile + tablet, hidden on xl and up) */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        )}
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}
