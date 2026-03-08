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
  websiteUrl,
  setWebsiteUrl,
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
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-3 sm:mb-4 text-gray-200">
            <span className="flex items-center gap-2">
              <FaImage className="text-purple-400" />
              <span>Upload Image for Face Search</span>
            </span>
          </label>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Image Upload/Preview */}
            <div>
              {imagePreview ? (
                <div className="relative group">
                  <div className="relative w-full h-64">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-2xl border-4 border-purple-500 shadow-2xl shadow-purple-500/50" 
                    />
                    <button
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-3 rounded-full text-sm hover:bg-red-600 flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-4 text-center text-sm text-green-400 flex items-center justify-center gap-2">
                    <FaCheckCircle />
                    <span className="font-semibold">Image ready for search</span>
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-purple-500/50 rounded-2xl cursor-pointer bg-gray-900/50 hover:bg-gray-900/70 hover:border-purple-500 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-16 h-16 mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <p className="mb-2 text-sm sm:text-base text-gray-300 font-semibold">
                        <span className="text-purple-400">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                    </div>
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
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Right: Analyzing Animation */}
            {loading && imagePreview && (
              <div className="relative w-full h-64 bg-gray-900/50 rounded-2xl border-4 border-purple-500/50 overflow-hidden">
                {/* Background Image */}
                <img 
                  src={imagePreview} 
                  alt="Analyzing" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                
                {/* Scanning Animation */}
                <div className="absolute inset-0 border-4 border-purple-500 rounded-2xl animate-ping opacity-20"></div>
                <div className="absolute inset-4 border-4 border-pink-500 rounded-2xl animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute inset-8 border-4 border-blue-500 rounded-2xl animate-ping opacity-40" style={{ animationDelay: '0.4s' }}></div>
                
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-6xl animate-pulse">👤</div>
                </div>
                
                {/* Scanning Line */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan"></div>
                </div>
                
                {/* Status Text */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white font-bold text-sm">🔍 Analyzing Face...</p>
                  <p className="text-gray-400 text-xs mt-1">Searching millions of images</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl">
            <p className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
              <span className="text-purple-400 text-lg">💡</span>
              <span>Upload a clear face photo. We'll search across millions of images on the internet using FaceCheck.id AI technology.</span>
            </p>
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

      {searchType === 'website' && (
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 text-gray-200">
            <span className="flex items-center gap-2">
              <span>🌐</span>
              <span>Enter Website URL</span>
            </span>
          </label>
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="e.g., https://example.com"
            className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition text-sm sm:text-base md:text-lg placeholder-gray-500"
          />
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl">
            <p className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
              <span className="text-blue-400 text-lg">🤖</span>
              <span>AI will auto-scroll, capture screenshots, extract contact info, detect technologies, and analyze the website content.</span>
            </p>
          </div>
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
