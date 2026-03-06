const SocialMediaLinks = ({ profiles }) => {
  if (!profiles || profiles.length === 0) return null;

  const platformIcons = {
    'Instagram': '📷',
    'Facebook': '👥',
    'Twitter': '🐦',
    'LinkedIn': '💼',
    'YouTube': '📺',
    'GitHub': '💻',
    'TikTok': '🎵',
    'Reddit': '🤖',
    'Telegram': '✈️',
    'Pinterest': '📌'
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-500/40 mb-6 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🔗 All Social Media Links
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {profiles.map((profile, index) => (
          <a
            key={index}
            href={profile.profileUrl || profile.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:border-purple-500/60 hover:bg-black/60 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{platformIcons[profile.platform] || '🌐'}</span>
                <span className="font-bold text-white">{profile.platform}</span>
              </div>
              <span className="text-purple-400 group-hover:text-purple-300 transition">→</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-1">@{profile.username}</div>
            
            {profile.followers > 0 && (
              <div className="text-xs text-gray-500">
                {profile.followers.toLocaleString()} followers
              </div>
            )}
            {profile.subscribers > 0 && (
              <div className="text-xs text-gray-500">
                {profile.subscribers.toLocaleString()} subscribers
              </div>
            )}
          </a>
        ))}
      </div>

      <div className="mt-4 p-4 bg-black/30 rounded-xl border border-purple-500/20">
        <div className="text-sm text-gray-400">
          💡 Click on any card to visit the profile directly
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
