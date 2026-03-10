import { FaUser, FaLink, FaImage, FaPhone } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { HiGlobeAlt } from 'react-icons/hi';

export default function SearchTypeSelector({ searchType, setSearchType }) {
  const types = [
    { id: 'username', icon: FaUser, label: 'Username', hint: 'Multi‑platform social profile scan' },
    { id: 'url', icon: FaLink, label: 'URL', hint: 'Analyze a single social profile link' },
    { id: 'image', icon: FaImage, label: 'Image', hint: 'Face + image based investigation' },
    { id: 'phone', icon: FaPhone, label: 'Phone', hint: 'Number validation & network info' },
    { id: 'ip', icon: MdLocationOn, label: 'IP', hint: 'Geolocation & ISP metadata' },
    { id: 'website', icon: HiGlobeAlt, label: 'Website', hint: 'Deep website intelligence' }
  ];

  const active = types.find((t) => t.id === searchType);

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-100">
          Investigation mode
        </h2>
        <p className="hidden sm:block text-[11px] sm:text-xs text-gray-400">
          Choose what you want to investigate: username, URL, image, phone, IP, or website.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-between bg-gray-900/70 border border-gray-800 rounded-2xl px-2 sm:px-3 py-2 sm:py-3">
        {types.map(({ id, icon: Icon, label }) => {
          const isActive = searchType === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSearchType(id)}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover-glow ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/40 shadow'
                  : 'bg-transparent text-gray-300 border border-gray-700 hover:border-purple-500/70'
              }`}
            >
              <Icon className="text-xs sm:text-sm" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Active mode hint */}
      {active && (
        <div className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-gray-400">
          {active.hint}
        </div>
      )}
    </div>
  );
}
