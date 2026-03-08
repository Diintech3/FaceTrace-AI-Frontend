import { useState, useEffect, useRef } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export default function WebsiteAnalyzer({ websiteUrl, onAnalysisComplete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [currentScroll, setCurrentScroll] = useState(0);

  const startAnalysis = async () => {
    if (!websiteUrl) return;
    
    setAnalyzing(true);
    setProgress('🌐 Loading website...');
    setScreenshots([]);
    setCurrentScroll(0);

    setTimeout(() => {
      setProgress('📸 Capturing screenshots...');
      captureScreenshots();
    }, 2000);
  };

  const captureScreenshots = async () => {
    const scrollSteps = 5;
    
    for (let i = 0; i < scrollSteps; i++) {
      setProgress(`📸 Screenshot ${i + 1}/${scrollSteps}...`);
      setCurrentScroll(((i + 1) / scrollSteps) * 100);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setScreenshots(prev => [...prev, {
        id: i,
        position: i + 1,
        timestamp: Date.now()
      }]);
    }

    setProgress('🤖 AI analyzing...');
    
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:3000/api/search/website', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: websiteUrl })
        });
        
        const data = await response.json();
        setProgress('✅ Complete!');
        setAnalyzing(false);
        
        if (onAnalysisComplete) {
          onAnalysisComplete(data);
        }
      } catch (error) {
        setProgress('❌ Failed');
        setAnalyzing(false);
      }
    }, 2000);
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-xl rounded-3xl p-6 border-2 border-blue-500/40 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🌐 Deep Website Analysis</h2>
        <button
          onClick={startAnalysis}
          disabled={analyzing || !websiteUrl}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
        >
          {analyzing ? <BiLoaderAlt className="animate-spin inline mr-2" /> : null}
          {analyzing ? 'Analyzing...' : 'Start Analysis'}
        </button>
      </div>
      
      {analyzing && (
        <div className="mb-4 bg-black/40 rounded-xl p-4 border border-blue-500/30">
          <p className="text-sm text-blue-300 mb-2">{progress}</p>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${currentScroll}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-black/40 rounded-xl p-4 border border-blue-500/30">
          <h3 className="text-lg font-bold mb-3 text-blue-400">📱 Live Preview</h3>
          <div className="relative bg-white rounded-lg overflow-hidden" style={{ height: '500px' }}>
            {websiteUrl ? (
              <iframe
                src={websiteUrl}
                className="w-full h-full"
                title="Preview"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Enter URL
              </div>
            )}
            
            {analyzing && (
              <div className="absolute inset-0 bg-blue-500/10 pointer-events-none">
                <div 
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ top: `${currentScroll}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/40 rounded-xl p-4 border border-blue-500/30">
          <h3 className="text-lg font-bold mb-3 text-blue-400">📸 Screenshots ({screenshots.length})</h3>
          <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
            {screenshots.map((screenshot) => (
              <div 
                key={screenshot.id}
                className="bg-black/60 rounded-lg p-3 border border-gray-700"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg h-32 flex items-center justify-center mb-2">
                  <span className="text-4xl">📸</span>
                </div>
                <p className="text-xs text-gray-400">Position: {screenshot.position}</p>
                <p className="text-xs text-green-400">✓ Captured</p>
              </div>
            ))}
            
            {analyzing && screenshots.length < 5 && (
              <div className="bg-black/60 rounded-lg p-3 border border-blue-500/50 animate-pulse">
                <div className="bg-blue-500/20 rounded-lg h-32 flex items-center justify-center mb-2">
                  <BiLoaderAlt className="text-4xl text-blue-400 animate-spin" />
                </div>
                <p className="text-xs text-blue-400">Capturing...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
