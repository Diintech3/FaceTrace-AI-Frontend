const FaceSearchResults = ({ faceCheckResults }) => {
  if (!faceCheckResults || !faceCheckResults.success || faceCheckResults.results.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Header with animation */}
      <div className="bg-gradient-to-br from-red-900/70 to-orange-900/70 backdrop-blur-xl rounded-2xl p-6 border-2 border-red-500/40 mb-6 shadow-2xl animate-pulse-slow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            🔍 Internet Face Search Results
          </h3>
          <span className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 font-bold text-sm">
            {faceCheckResults.totalResults} MATCHES FOUND
          </span>
        </div>
        <p className="text-gray-300 text-sm">
          Powered by FaceCheck.id - Searching across millions of images on the internet
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faceCheckResults.results.map((result, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-sm rounded-xl border border-red-500/30 overflow-hidden hover:border-red-500/60 transition-all group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Thumbnail */}
            {result.thumbnail && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Match Score Overlay */}
                <div className="absolute top-2 right-2 px-3 py-1 bg-red-600 rounded-lg font-bold text-white text-sm">
                  {result.score}% Match
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <div className="text-sm text-gray-400 mb-1">{result.source}</div>
              <div className="text-white font-semibold mb-2 line-clamp-2">{result.title}</div>
              
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition w-full justify-center"
              >
                View Source →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-black/30 rounded-xl border border-red-500/20">
        <div className="text-sm text-gray-400">
          ℹ️ These results show where this face appears on the internet. Match scores indicate similarity (higher = better match).
        </div>
      </div>
    </div>
  );
};

export default FaceSearchResults;
