import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { analyzeWebsite } from '../../utils/api';

export default function WebsiteAnalyzer({ websiteUrl, onAnalysisComplete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState('');

  const startAnalysis = async () => {
    if (!websiteUrl) return;
    
    setAnalyzing(true);
    setProgress('🌐 Starting deep analysis...');

    try {
      const data = await analyzeWebsite(websiteUrl);
      setProgress('✅ Analysis complete!');
      setAnalyzing(false);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch (error) {
      setProgress('❌ Analysis failed: ' + error.message);
      setAnalyzing(false);
    }
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/40 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">🌐 Deep Website Analysis</h2>
        <p className="text-gray-300 text-sm">AI-powered comprehensive website intelligence</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-bold mb-3 text-blue-400">📱 Live Preview</h3>
          <div className="relative bg-white rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {websiteUrl ? (
              <iframe
                src={websiteUrl}
                className="w-full h-full"
                title="Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-2">🌐</div>
                  <p>Enter URL</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-bold mb-3 text-blue-400">📸 Analysis Features</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <span className="text-2xl">📸</span>
              <div>
                <p className="font-semibold text-white">Screenshot Capture</p>
                <p className="text-gray-400">Full page scrolling screenshots</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-semibold text-white">Contact Extraction</p>
                <p className="text-gray-400">Emails, phones, social media</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-2xl">⚙️</span>
              <div>
                <p className="font-semibold text-white">Tech Detection</p>
                <p className="text-gray-400">Frameworks, CMS, libraries</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="font-semibold text-white">Domain Intelligence</p>
                <p className="text-gray-400">WHOIS, DNS, registrar info</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-semibold text-white">AI Analysis</p>
                <p className="text-gray-400">Comprehensive insights & recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {analyzing && (
        <div className="mb-6 bg-black/40 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-3">
            <BiLoaderAlt className="text-3xl text-blue-400 animate-spin" />
            <p className="text-lg font-semibold text-blue-300">{progress}</p>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">This may take 1-3 minutes depending on website size...</p>
        </div>
      )}

      <button
        onClick={startAnalysis}
        disabled={analyzing || !websiteUrl}
        className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
      >
        {analyzing ? (
          <span className="flex items-center justify-center gap-2">
            <BiLoaderAlt className="animate-spin text-2xl" />
            Analyzing Website...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            🚀 Start Analysis
          </span>
        )}
      </button>
    </div>
  );
}
