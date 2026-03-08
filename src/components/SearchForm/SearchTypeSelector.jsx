import { FaUser, FaLink, FaImage, FaPhone } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { HiGlobeAlt } from 'react-icons/hi';

export default function SearchTypeSelector({ searchType, setSearchType }) {
  const types = [
    { id: 'username', icon: FaUser, label: 'Username' },
    { id: 'url', icon: FaLink, label: 'URL' },
    { id: 'image', icon: FaImage, label: 'Image' },
    { id: 'phone', icon: FaPhone, label: 'Phone' },
    { id: 'ip', icon: MdLocationOn, label: 'IP' },
    { id: 'website', icon: HiGlobeAlt, label: 'Website' }
  ];

  return (
    <div className="w-full flex gap-2 mb-4 sm:mb-6 md:mb-8 justify-center">
      {types.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setSearchType(id)}
          className={`flex-1 max-w-[120px] sm:max-w-[150px] px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${
            searchType === id
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Icon className="text-base sm:text-lg md:text-xl" />
            <span className="hidden sm:inline">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
