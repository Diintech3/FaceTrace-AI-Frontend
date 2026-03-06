const IPDetails = ({ ipData }) => {
  if (!ipData || ipData.error) {
    return (
      <div className="bg-red-900/30 backdrop-blur-xl rounded-2xl p-6 border border-red-500/40 mb-6">
        <h3 className="text-xl font-bold text-red-400 mb-2">❌ IP Lookup Failed</h3>
        <p className="text-gray-300">{ipData?.error || 'IP lookup failed'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-900/70 to-cyan-900/70 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-500/40 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            🌍 IP Geolocation Report
          </h3>
          <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 font-bold text-sm">
            ✅ ACTIVE
          </span>
        </div>
        <div className="text-3xl font-bold text-blue-400 mb-2">{ipData.ip}</div>
        <div className="text-gray-300">Scanned on {new Date().toLocaleString()}</div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">IP Address</div>
          <div className="text-xl font-bold text-blue-400">{ipData.ip}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Hostname</div>
          <div className="text-lg font-bold text-white break-all">{ipData.hostname || 'Not Available'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">City</div>
          <div className="text-xl font-bold text-white">{ipData.city || 'Unknown'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Region / State</div>
          <div className="text-lg font-bold text-white">{ipData.region || 'Unknown'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Country</div>
          <div className="text-xl font-bold text-white">{ipData.country || 'Unknown'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Postal Code</div>
          <div className="text-xl font-bold text-white">{ipData.postal || 'N/A'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Coordinates</div>
          <div className="text-lg font-bold text-white">{ipData.location || 'N/A'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30 md:col-span-2">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Timezone</div>
          <div className="text-lg font-bold text-white">{ipData.timezone || 'Unknown'}</div>
        </div>
      </div>

      {/* ISP Information */}
      <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          📡 ISP & Network Information
        </h4>
        <div className="bg-black/30 rounded-xl p-5 border border-purple-500/20">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Organization / ISP</div>
          <div className="text-lg font-bold text-white">{ipData.organization || 'Not Available'}</div>
        </div>
      </div>

      {/* Map Link */}
      {ipData.location && (
        <div className="bg-gradient-to-br from-green-900/50 to-teal-900/50 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            🗺️ Location on Map
          </h4>
          <a
            href={`https://www.google.com/maps?q=${ipData.location}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            👁️ View on Google Maps
          </a>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          📊 Additional Details
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">IP Version</span>
            <span className="text-white font-semibold">IPv4</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Lookup Method</span>
            <span className="text-white font-semibold">IPInfo API</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Data Source</span>
            <span className="text-white font-semibold">Global IP Database</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Scan Time</span>
            <span className="text-white font-semibold">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Raw JSON Data */}
      <details className="bg-black/30 rounded-2xl p-6 border border-gray-700/50">
        <summary className="cursor-pointer text-sm font-semibold text-gray-200 hover:text-white transition">
          🔍 View Raw API Response (JSON)
        </summary>
        <pre className="mt-4 text-xs whitespace-pre-wrap break-words text-gray-300 max-h-96 overflow-auto bg-black/40 p-4 rounded-xl border border-gray-700/60">
          {JSON.stringify(ipData, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default IPDetails;
