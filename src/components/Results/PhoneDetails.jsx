const PhoneDetails = ({ phoneData }) => {
  if (!phoneData || !phoneData.valid) {
    return (
      <div className="bg-red-900/30 backdrop-blur-xl rounded-2xl p-6 border border-red-500/40 mb-6">
        <h3 className="text-xl font-bold text-red-400 mb-2">❌ Invalid Phone Number</h3>
        <p className="text-gray-300">{phoneData?.error || 'Phone number validation failed'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-green-900/70 to-emerald-900/70 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-500/40 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            📱 Phone Number Validation Report
          </h3>
          <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 font-bold text-sm">
            ✅ VERIFIED
          </span>
        </div>
        <div className="text-3xl font-bold text-green-400 mb-2">{phoneData.internationalFormat}</div>
        <div className="text-gray-300">Validated on {new Date().toLocaleString()}</div>
      </div>

      {phoneData.notes?.length > 0 && (
        <div className="bg-yellow-900/30 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/40">
          <h4 className="text-lg font-bold text-yellow-400 mb-2">⚠️ Notes</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {phoneData.notes.map((n, idx) => <li key={idx}>- {n}</li>)}
          </ul>
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">International Format</div>
          <div className="text-xl font-bold text-green-400">{phoneData.internationalFormat}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Local Format</div>
          <div className="text-xl font-bold text-white">{phoneData.localFormat}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Country Code</div>
          <div className="text-xl font-bold text-white">{phoneData.countryCode}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Country Name</div>
          <div className="text-lg font-bold text-white">{phoneData.countryName}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Country Prefix</div>
          <div className="text-xl font-bold text-white">+{phoneData.countryPrefix}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Line Type</div>
          <div className="text-lg font-bold text-white capitalize">
            {phoneData.lineType === 'mobile' ? '📱 Mobile' : '☎️ ' + phoneData.lineType}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30 md:col-span-2">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Location / Region</div>
          <div className="text-lg font-bold text-white">{phoneData.location || 'Not Available'}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Validation Status</div>
          <div className="text-lg font-bold text-green-400">✅ Valid & Active</div>
        </div>
      </div>

      {/* Carrier Information */}
      <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          📡 Carrier & Network Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Carrier / Operator</div>
            <div className="text-lg font-bold text-white">{phoneData.carrier || 'Not Available'}</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Network Type</div>
            <div className="text-lg font-bold text-white">
              {phoneData.lineType === 'mobile' ? 'Mobile Network (GSM/CDMA)' : 'Landline Network'}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          📊 Additional Details
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Number Format</span>
            <span className="text-white font-semibold">E.164 International Standard</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Validation Method</span>
            <span className="text-white font-semibold">Numverify API</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Data Source</span>
            <span className="text-white font-semibold">Global Telecom Database</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
            <span className="text-gray-400">Verification Time</span>
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
          {JSON.stringify(phoneData, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default PhoneDetails;
