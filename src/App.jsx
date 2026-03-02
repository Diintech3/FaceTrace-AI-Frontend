import { useState } from 'react'
import { FaUser, FaLink, FaImage, FaRocket, FaSearch, FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaReddit, FaTelegram, FaPinterest, FaFacebook } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { BiLoaderAlt } from 'react-icons/bi'
import { MdVerified } from 'react-icons/md'
import './App.css'

function App() {
  const [searchType, setSearchType] = useState('username');
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults(null);

    try {
      let response;
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      if (searchType === 'username') {
        console.log('Searching username:', username);
        response = await fetch(`${API_URL}/api/search/username`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
      } else if (searchType === 'url') {
        console.log('Searching URL:', profileUrl);
        response = await fetch(`${API_URL}/api/search/url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: profileUrl })
        });
      } else if (searchType === 'image' && image) {
        console.log('Searching image:', image.name);
        const formData = new FormData();
        formData.append('image', image);
        response = await fetch(`${API_URL}/api/search/image`, {
          method: 'POST',
          body: formData
        });
      }

      const data = await response.json();
      console.log('Response data:', data);
      setResults(data.data);
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] animate-grid"></div>
        
        {/* Floating Glass Shapes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute glass-morph animate-float-slow"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <header className="w-full glass-header sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <FaSearch className="text-xl sm:text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FaceTrace AI
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

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Search Type Selector */}
        <div className="w-full flex gap-2 mb-4 sm:mb-6 md:mb-8 justify-center">
          <button
            onClick={() => setSearchType('username')}
            className={`flex-1 max-w-[120px] sm:max-w-[150px] px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${
              searchType === 'username'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <FaUser className="text-base sm:text-lg md:text-xl" />
              <span className="hidden sm:inline">Username</span>
            </div>
          </button>
          <button
            onClick={() => setSearchType('url')}
            className={`flex-1 max-w-[120px] sm:max-w-[150px] px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${
              searchType === 'url'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <FaLink className="text-base sm:text-lg md:text-xl" />
              <span className="hidden sm:inline">URL</span>
            </div>
          </button>
          <button
            onClick={() => setSearchType('image')}
            className={`flex-1 max-w-[120px] sm:max-w-[150px] px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${
              searchType === 'image'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <FaImage className="text-base sm:text-lg md:text-xl" />
              <span className="hidden sm:inline">Image</span>
            </div>
          </button>
        </div>

        {/* Search Input */}
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
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full max-w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gray-900/80 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition text-xs sm:text-sm md:text-base file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer file:font-semibold file:text-xs sm:file:text-sm hover:file:bg-purple-700 file:transition"
                />
              </div>
              {image && (
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-green-400 flex items-center gap-2">
                  <span>✓</span>
                  <span className="truncate">Selected: {image.name}</span>
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-4 sm:mt-5 md:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <BiLoaderAlt className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span className="text-xs sm:text-sm md:text-base">Searching...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaRocket />
                <span>Start Investigation</span>
              </div>
            )}
          </button>
        </div>

        {/* Results */}
        {results && results.profiles && results.profiles.length > 0 && (
          <div className="mt-8">
            {/* AI Biodata Card - For ALL searches */}
            {results.aiBiodata && results.aiBiodata.success && (
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-lg rounded-2xl p-8 border-2 border-blue-500/40 mb-6 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-400 flex items-center justify-center gap-3">
                  🤖 AI-Generated Complete Biodata
                  <span className="text-sm bg-blue-500/20 px-3 py-1 rounded-full">Powered by OpenRouter AI</span>
                </h2>
                
                <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">📋</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-300 mb-2">Comprehensive Profile Analysis</h3>
                      <p className="text-xs text-gray-400 mb-4">Model: {results.aiBiodata.model} | Analyzed {results.totalFound} platforms</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-sm">
                      {results.aiBiodata.biodata}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-400">
                  ℹ️ AI-generated analysis based on publicly available social media data. Verify information independently.
                </div>
              </div>
            )}

            {/* AI Analysis Card - Only for Image Search */}
            {results.aiAnalysis && results.aiAnalysis.success && (
              <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-lg rounded-2xl p-8 border-2 border-green-500/40 mb-6 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-400 flex items-center justify-center gap-3">
                  🔍 AI Image Analysis
                  <span className="text-sm bg-green-500/20 px-3 py-1 rounded-full">Visual Recognition</span>
                </h2>
                
                <div className="bg-black/40 rounded-xl p-6 border border-green-500/30">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">👤</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-300 mb-2">Person Profile from Image</h3>
                      <p className="text-xs text-gray-400 mb-4">Model: {results.aiAnalysis.model}</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {results.aiAnalysis.analysis}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-400">
                  ⚠️ AI-generated analysis based on visual information only. May not be 100% accurate.
                </div>
              </div>
            )}

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-purple-500/40 mb-6 sm:mb-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">🎯</span>
                  <span>Investigation Results</span>
                </h2>
                <div className="text-xs sm:text-sm text-gray-300 bg-black/30 px-3 sm:px-4 py-2 rounded-full">
                  {new Date(results.searchedAt).toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/30 hover:border-purple-500/60 transition">
                  <div className="text-3xl sm:text-5xl font-bold text-purple-400 mb-2">{results.totalFound}</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Profiles Found</div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">Across platforms</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/30 hover:border-green-500/60 transition">
                  <div className="text-3xl sm:text-5xl font-bold text-green-400 mb-2">{results.profiles.filter(p => p.email && p.email !== 'N/A').length}</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Emails Found</div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">Contact info</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30 hover:border-blue-500/60 transition">
                  <div className="text-3xl sm:text-5xl font-bold text-blue-400 mb-2">{results.profiles.filter(p => p.location && p.location !== 'N/A').length}</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Locations</div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">Geographic data</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/30 hover:border-yellow-500/60 transition">
                  <div className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-2">{results.profiles.filter(p => p.verified || p.isVerified).length}</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Verified</div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">Authentic accounts</div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
                <span>🔍</span>
                <span>Searched: <span className="text-purple-400 font-semibold">{results.username}</span></span>
              </div>
            </div>

            {/* User Consolidated Information Card */}
            <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-500/40 mb-6 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">👤 User Complete Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="bg-black/40 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    📋 Personal Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400 min-w-[100px]">Username:</span>
                      <span className="text-white font-semibold">{results.username}</span>
                    </div>
                    {results.profiles.find(p => p.fullName && p.fullName !== 'N/A') && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 min-w-[100px]">Full Name:</span>
                        <span className="text-white font-semibold">{results.profiles.find(p => p.fullName && p.fullName !== 'N/A')?.fullName}</span>
                      </div>
                    )}
                    {results.profiles.find(p => p.email && p.email !== 'N/A') && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 min-w-[100px]">📧 Email:</span>
                        <span className="text-green-400 font-semibold break-all">{results.profiles.find(p => p.email && p.email !== 'N/A')?.email}</span>
                      </div>
                    )}
                    {results.profiles.find(p => p.phone && p.phone !== 'N/A') && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 min-w-[100px]">📱 Phone:</span>
                        <span className="text-green-400 font-semibold">{results.profiles.find(p => p.phone && p.phone !== 'N/A')?.phone}</span>
                      </div>
                    )}
                    {results.profiles.find(p => p.location && p.location !== 'N/A') && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 min-w-[100px]">📍 Location:</span>
                        <span className="text-blue-400 font-semibold">{results.profiles.find(p => p.location && p.location !== 'N/A')?.location}</span>
                      </div>
                    )}
                    {results.profiles.find(p => p.company && p.company !== 'N/A') && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 min-w-[100px]">🏢 Company:</span>
                        <span className="text-yellow-400 font-semibold">{results.profiles.find(p => p.company && p.company !== 'N/A')?.company}</span>
                      </div>
                    )}
                    {results.profiles.find(p => p.website && p.website !== 'N/A') && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-400 min-w-[100px]">🌐 Website:</span>
                        <a href={results.profiles.find(p => p.website && p.website !== 'N/A')?.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-semibold underline break-all">
                          {results.profiles.find(p => p.website && p.website !== 'N/A')?.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media Presence */}
                <div className="bg-black/40 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    🌐 Social Media Presence
                  </h3>
                  <div className="space-y-2">
                    {results.profiles.map((profile, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{profile.platform === 'YouTube' ? '🎥' : profile.platform === 'Instagram' ? '📸' : profile.platform === 'Twitter' ? '🐦' : profile.platform === 'LinkedIn' ? '💼' : profile.platform === 'GitHub' ? '💻' : profile.platform === 'Reddit' ? '🤖' : profile.platform === 'Telegram' ? '✈️' : profile.platform === 'TikTok' ? '🎵' : '📌'}</span>
                          <span className="text-white font-semibold">{profile.platform}</span>
                          {(profile.verified || profile.isVerified) && <span className="text-blue-400">✓</span>}
                        </div>
                        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
                          View →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio/Description */}
                {results.profiles.find(p => p.bio && p.bio !== 'No bio') && (
                  <div className="bg-black/40 rounded-xl p-6 border border-purple-500/30 md:col-span-2">
                    <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                      💬 Bio/Description
                    </h3>
                    <p className="text-gray-300 italic leading-relaxed">
                      "{results.profiles.find(p => p.bio && p.bio !== 'No bio')?.bio}"
                    </p>
                  </div>
                )}

                {/* Statistics Summary */}
                <div className="bg-black/40 rounded-xl p-6 border border-purple-500/30 md:col-span-2">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    📊 Social Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {results.profiles.reduce((acc, p) => acc + (parseInt(p.followers?.toString().replace(/[^0-9]/g, '')) || 0), 0) > 0 && (
                      <div className="bg-purple-900/30 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-purple-400">👥</p>
                        <p className="text-sm text-gray-400 mt-1">Total Followers</p>
                        <p className="text-white font-semibold">{results.profiles.map(p => p.followers).filter(f => f && f !== 'N/A').join(', ')}</p>
                      </div>
                    )}
                    {results.profiles.find(p => p.posts && p.posts !== 'N/A') && (
                      <div className="bg-pink-900/30 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-pink-400">📸</p>
                        <p className="text-sm text-gray-400 mt-1">Total Posts</p>
                        <p className="text-white font-semibold">{results.profiles.map(p => p.posts).filter(f => f && f !== 'N/A').join(', ')}</p>
                      </div>
                    )}
                    {results.profiles.find(p => p.subscribers) && (
                      <div className="bg-red-900/30 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-red-400">🎥</p>
                        <p className="text-sm text-gray-400 mt-1">Subscribers</p>
                        <p className="text-white font-semibold">{results.profiles.find(p => p.subscribers)?.subscribers}</p>
                      </div>
                    )}
                    {results.profiles.find(p => p.karma) && (
                      <div className="bg-orange-900/30 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-orange-400">⭐</p>
                        <p className="text-sm text-gray-400 mt-1">Reddit Karma</p>
                        <p className="text-white font-semibold">{results.profiles.find(p => p.karma)?.karma}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl">📊</span>
              <span>Detailed Profiles</span>
              <span className="text-base sm:text-lg text-gray-400">({results.totalFound} platforms)</span>
            </h2>
            <div className="grid gap-4 sm:gap-6">
              {results.profiles.map((profile, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <div className="flex items-start gap-4">
                    {profile.profilePic && (
                      <img
                        src={profile.profilePic}
                        alt={profile.username}
                        className="w-20 h-20 rounded-full border-2 border-purple-500"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-purple-400">{profile.platform}</h3>
                        {(profile.isVerified || profile.verified) && <span className="text-blue-400 text-xl">✓</span>}
                      </div>
                      
                      {/* Username & Full Name */}
                      <p className="text-lg text-white font-semibold">@{profile.username || profile.channelName}</p>
                      {profile.fullName && profile.fullName !== 'N/A' && (
                        <p className="text-gray-300 mt-1">📛 {profile.fullName}</p>
                      )}
                      
                      {/* Bio/Description */}
                      {profile.bio && profile.bio !== 'No bio' && (
                        <p className="text-gray-400 mt-2 text-sm italic">"{profile.bio}"</p>
                      )}
                      {profile.description && (
                        <p className="text-gray-400 mt-2 text-sm italic">"{profile.description}"</p>
                      )}
                      
                      {/* Contact Information */}
                      <div className="mt-3 space-y-1 text-sm">
                        {profile.email && profile.email !== 'N/A' && (
                          <p className="text-green-400">📧 Email: {profile.email}</p>
                        )}
                        {profile.phone && profile.phone !== 'N/A' && (
                          <p className="text-green-400">📱 Phone: {profile.phone}</p>
                        )}
                        {profile.location && profile.location !== 'N/A' && (
                          <p className="text-blue-400">📍 Location: {profile.location}</p>
                        )}
                        {profile.company && profile.company !== 'N/A' && (
                          <p className="text-yellow-400">🏢 Company: {profile.company}</p>
                        )}
                        {profile.website && profile.website !== 'N/A' && (
                          <p className="text-cyan-400">🌐 Website: <a href={profile.website} target="_blank" rel="noopener noreferrer" className="underline">{profile.website}</a></p>
                        )}
                      </div>

                      {/* Statistics */}
                      <div className="flex flex-wrap gap-4 mt-4 text-sm">
                        {profile.followers && profile.followers !== 'N/A' && (
                          <span className="bg-purple-900/50 px-3 py-1 rounded-full">👥 {profile.followers} followers</span>
                        )}
                        {profile.following && profile.following !== 'N/A' && (
                          <span className="bg-purple-900/50 px-3 py-1 rounded-full">➡️ {profile.following} following</span>
                        )}
                        {profile.posts && profile.posts !== 'N/A' && (
                          <span className="bg-purple-900/50 px-3 py-1 rounded-full">📸 {profile.posts} posts</span>
                        )}
                        {profile.subscribers && (
                          <span className="bg-red-900/50 px-3 py-1 rounded-full">👥 {profile.subscribers} subscribers</span>
                        )}
                        {profile.videos && (
                          <span className="bg-red-900/50 px-3 py-1 rounded-full">🎥 {profile.videos} videos</span>
                        )}
                        {profile.views && (
                          <span className="bg-red-900/50 px-3 py-1 rounded-full">👁️ {profile.views} views</span>
                        )}
                        {profile.karma && (
                          <span className="bg-orange-900/50 px-3 py-1 rounded-full">⭐ {profile.karma} karma</span>
                        )}
                        {profile.publicRepos && (
                          <span className="bg-gray-700 px-3 py-1 rounded-full">📦 {profile.publicRepos} repos</span>
                        )}
                      </div>

                      {/* Additional Info */}
                      {profile.createdAt && (
                        <p className="text-gray-500 text-xs mt-3">📅 Joined: {profile.createdAt}</p>
                      )}
                      {profile.message && (
                        <p className="text-gray-500 text-xs mt-1">ℹ️ {profile.message}</p>
                      )}

                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold shadow-lg shadow-purple-500/30"
                      >
                        <span>🔗</span>
                        <span>View Profile</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {results && (!results.profiles || results.profiles.length === 0) && (
          <div className="mt-8">
            {/* Show AI Analysis regardless of profiles */}
            {results.aiAnalysis && results.aiAnalysis.success && (
              <div className="bg-gradient-to-br from-green-900/70 to-emerald-900/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-500/50 mb-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <span className="text-4xl">🔍</span>
                    <span>AI Image Analysis</span>
                  </h2>
                  <span className="text-xs bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">Visual Recognition</span>
                </div>
                <div className="bg-black/40 rounded-xl p-6 border border-green-500/30">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {results.aiAnalysis.analysis}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {results.aiBiodata && results.aiBiodata.success && (
              <div className="bg-gradient-to-br from-blue-900/70 to-indigo-900/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/50 mb-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <span className="text-4xl">🤖</span>
                    <span>AI Biodata</span>
                  </h2>
                  <span className="text-xs bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">OpenRouter AI</span>
                </div>
                <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-sm">
                      {results.aiBiodata.biodata}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center p-12 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl font-bold text-gray-300 mb-2">No Social Media Profiles Found</p>
              <p className="text-gray-500">Try a different username or check the console for errors</p>
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  )
}

export default App
