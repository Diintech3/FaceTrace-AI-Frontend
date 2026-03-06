export default function InstagramDetails({ profile }) {
  if (!profile.postsData || profile.postsData.length === 0) return null;

  return (
    <div className="mt-6 space-y-6">
      {/* Analytics */}
      {profile.analytics && (
        <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 rounded-xl p-6 border border-pink-500/30">
          <h4 className="text-xl font-bold text-pink-300 mb-4">📊 Analytics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-pink-400">{profile.analytics.totalLikes}</div>
              <div className="text-xs text-gray-400">Total Likes</div>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">{profile.analytics.totalComments}</div>
              <div className="text-xs text-gray-400">Total Comments</div>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">{profile.analytics.avgLikes}</div>
              <div className="text-xs text-gray-400">Avg Likes</div>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{profile.analytics.engagementRate}</div>
              <div className="text-xs text-gray-400">Engagement Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl p-6 border border-purple-500/30">
        <h4 className="text-xl font-bold text-purple-300 mb-4">📸 Recent Posts ({profile.postsData.length})</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {profile.postsData.slice(0, 12).map((post, idx) => (
            <a
              key={idx}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-500 transition"
            >
              <img
                src={post.displayUrl}
                alt={`Post ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-sm font-bold">❤️ {post.likes}</div>
                  <div className="text-xs">💬 {post.comments}</div>
                </div>
              </div>
              {post.isVideo && (
                <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                  <span className="text-xs">🎥</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
