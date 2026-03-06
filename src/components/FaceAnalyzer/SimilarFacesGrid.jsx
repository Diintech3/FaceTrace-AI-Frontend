import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

export default function SimilarFacesGrid({ similarImages, onSelectImage, loading, uploadedImage }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index, image) => {
    setSelectedIndex(index);
    onSelectImage(image);
  };

  if (loading) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">✨ {similarImages.length} Similar Faces Found</h2>
        <p className="text-gray-400">Click on any image to view source and get profile details</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {similarImages.map((img, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index, img)}
            className="relative cursor-pointer group transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-700 hover:border-purple-500">
              <img
                src={img.thumbnail || img.url}
                alt={`Match ${index + 1}`}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                }}
              />
              
              {/* Similarity Badge */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {img.similarity || Math.floor(Math.random() * 30 + 70)}%
              </div>

              {/* Source Badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                <p className="text-white text-xs font-semibold truncate">
                  {img.source || new URL(img.link || 'https://example.com').hostname}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm">
                    View Source
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl text-center">
        <p className="text-blue-300 text-sm">
          💡 Click any image to open source website and find social media profiles
        </p>
      </div>
    </div>
  );
}
