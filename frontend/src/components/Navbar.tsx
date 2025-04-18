export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-6 py-6 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" /> {/* Replace with your actual logo */}
          <span className="text-xl font-bold text-black tracking-wide">TODO</span>
        </div>
      </nav>
    );
  }
  