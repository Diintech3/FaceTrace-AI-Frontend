export default function AIBiodata({ aiBiodata }) {
  if (!aiBiodata || !aiBiodata.success) return null;

  return (
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
            <p className="text-xs text-gray-400 mb-4">Model: {aiBiodata.model}</p>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-sm">
            {aiBiodata.biodata}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-400">
        ℹ️ AI-generated analysis based on publicly available social media data. Verify information independently.
      </div>
    </div>
  );
}
