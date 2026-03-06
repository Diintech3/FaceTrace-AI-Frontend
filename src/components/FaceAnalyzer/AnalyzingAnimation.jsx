import { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export default function AnalyzingAnimation({ uploadedImage }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Uploading...');

  useEffect(() => {
    const stages = [
      { text: '📤 Uploading image...', duration: 1000 },
      { text: '🔍 Detecting faces...', duration: 2000 },
      { text: '🧠 Analyzing facial features...', duration: 2000 },
      { text: '🌐 Searching across internet...', duration: 3000 },
      { text: '📊 Processing millions of images...', duration: 2000 },
      { text: '✨ Finding matches...', duration: 2000 }
    ];

    let currentStage = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setStage(stages[currentStage].text);
        currentProgress += 100 / stages.length;
        setProgress(Math.min(currentProgress, 95));
        currentStage++;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <img 
              src={uploadedImage} 
              alt="Analyzing" 
              className="w-48 h-48 object-cover rounded-2xl border-4 border-purple-500 shadow-2xl shadow-purple-500/50 animate-pulse"
            />
            <div className="absolute inset-0 border-4 border-purple-500 rounded-2xl animate-ping opacity-20"></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold text-lg">{stage}</span>
            <span className="text-purple-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transition-all duration-500 animate-pulse"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BiLoaderAlt className="w-8 h-8 text-purple-400 animate-spin" />
            <span className="text-xl font-bold text-white">AI Face Recognition Active</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i}
                className="h-20 bg-gray-800/50 rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          🔒 Secure processing • 🌍 Searching millions of images • ⚡ AI-powered matching
        </p>
      </div>
    </div>
  );
}
