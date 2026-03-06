import { FaUser, FaLink, FaImage, FaRocket, FaCheckCircle, FaTimes, FaPhone } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

export default function SearchInput({ 
  searchType, 
  username, 
  setUsername, 
  profileUrl, 
  setProfileUrl, 
  image, 
  setImage, 
  imagePreview, 
  setImagePreview,
  phone,
  setPhone,
  ip,
  setIp,
  loading,
  scanProgress,
  onSearch 
}) {
  return (
    <div className="w-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-purple-500/30 max-w-3xl mx-auto">
      {searchType === 'username' && (
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-gray-200">
            <span className="flex items-center gap-2">
              <FaUser />
              <span>Enter Username</span>
            </span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., john_doe"
            className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition text-sm sm:text-base md:text-lg placeholder-gray-500"
          />
        </div>
      )}

      {searchType === 'url' && (
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-gray-200">
            <span className="flex items-center gap-2">
              <FaLink />
              <span>Enter Profile URL</span>
            </span>
          </label>
          <input
            type="text"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            placeholder="e.g., https://instagram.com/username"
            className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition text-sm sm:text-base md:text-lg placeholder-gray-500"
          />
        </div>
      )}

      {searchType === 'image' && (
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-gray-200">
            <span className="flex items-center gap-2">
              <FaImage />
              <span>Upload Image</span>
            </span>
          </label>
          
          {imagePreview && (
            <div className="mb-4 relative group">
              <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover mx-auto rounded-xl border-2 border-purple-500 shadow-lg" />
              <button
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg text-sm hover:bg-red-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTimes />
              </button>
            </div>
          )}
          
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition text-xs sm:text-sm md:text-base file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer file:font-semibold file:text-xs sm:file:text-sm hover:file:bg-purple-700 file:transition"
            />
          </div>
          {image && (
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-green-400 flex items-center gap-2">
              <FaCheckCircle />
              <span className="truncate">Selected: {image.name}</span>
            </p>
          )}
          
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <label className="block text-xs sm:text-sm font-medium mb-2 text-blue-300">
              <span className="flex items-center gap-2">
                <FaUser />
                <span>Know the username? (Optional - for better results)</span>
              </span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., elonmusk"
              className="w-full px-3 py-2 bg-gray-900/80 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-sm placeholder-gray-500"
            />
            <p className="mt-2 text-xs text-gray-400">💡 Tip: Adding username helps find accurate profiles</p>
          </div>
        </div>
      )}

      {searchType === 'phone' && (
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-gray-200">
            <span className="flex items-center gap-2">
              <FaPhone />
              <span>Enter Phone Number</span>
            </span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., 14158586273 or +14158586273"
            className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition text-sm sm:text-base md:text-lg placeholder-gray-500"
          />
          <p className="mt-2 text-xs text-gray-400">💡 Enter with country code (e.g., +1 for US)</p>
        </div>
      )}

      {searchType === 'ip' && (
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-gray-200">
            <span className="flex items-center gap-2">
              <span>🌍</span>
              <span>Enter IP Address</span>
            </span>
          </label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="e.g., 8.8.8.8 or 1.1.1.1"
            className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition text-sm sm:text-base md:text-lg placeholder-gray-500"
          />
          <p className="mt-2 text-xs text-gray-400">💡 Enter IPv4 address to get geolocation details</p>
        </div>
      )}

      <button
        onClick={onSearch}
        disabled={loading}
        className="w-full mt-4 sm:mt-5 md:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 relative overflow-hidden"
      >
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-pulse"></div>
        )}
        {loading ? (
          <div className="relative z-10 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <BiLoaderAlt className="w-5 h-5 animate-spin" />
              <BsSearch className="w-4 h-4 animate-bounce" />
            </div>
            <span className="text-xs sm:text-sm font-semibold animate-pulse">{scanProgress || 'Searching...'}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <FaRocket />
            <span>Start Investigation</span>
          </div>
        )}
      </button>
    </div>
  );
}
