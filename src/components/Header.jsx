import { FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="w-full glass-header sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <FaSearch className="text-xl sm:text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                DigitalTrace AI
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">Advanced OSINT Intelligence Platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <span className="text-gray-400">Powered by AI</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
