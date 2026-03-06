import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaGlobe, FaUsers, FaArrowRight, FaCamera, FaEye, FaStar, FaBox, FaYoutube, FaCalendar, FaInfoCircle } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import InstagramDetails from './InstagramDetails';

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:shadow-xl hover:shadow-purple-500/20">
      <div className="flex items-start gap-4">
        {profile.profilePic && (
          <img
            src={profile.profilePic}
            alt={profile.username}
            className="w-20 h-20 rounded-full border-2 border-purple-500"
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-bold text-purple-400">{profile.platform}</h3>
            {(profile.isVerified || profile.verified) && <MdVerified className="text-blue-400 text-xl" />}
          </div>
          
          <p className="text-lg text-white font-semibold">@{profile.username || profile.channelName}</p>
          {profile.fullName && profile.fullName !== 'N/A' && (
            <p className="text-gray-300 mt-1">📛 {profile.fullName}</p>
          )}
          
          {(profile.bio && profile.bio !== 'No bio') || profile.description ? (
            <p className="text-gray-400 mt-2 text-sm italic line-clamp-3">
              "{profile.bio && profile.bio !== 'No bio' ? profile.bio : profile.description}"
            </p>
          ) : null}
          
          <div className="mt-3 space-y-1 text-sm">
            {profile.email && profile.email !== 'N/A' && (
              <p className="text-green-400 flex items-center gap-2"><FaEnvelope /> Email: {profile.email}</p>
            )}
            {profile.phone && profile.phone !== 'N/A' && (
              <p className="text-green-400 flex items-center gap-2"><FaPhone /> Phone: {profile.phone}</p>
            )}
            {profile.location && profile.location !== 'N/A' && (
              <p className="text-blue-400 flex items-center gap-2"><FaMapMarkerAlt /> Location: {profile.location}</p>
            )}
            {profile.company && profile.company !== 'N/A' && (
              <p className="text-yellow-400 flex items-center gap-2"><FaBuilding /> Company: {profile.company}</p>
            )}
            {profile.website && profile.website !== 'N/A' && (
              <p className="text-cyan-400 flex items-center gap-2"><FaGlobe /> Website: <a href={profile.website} target="_blank" rel="noopener noreferrer" className="underline">{profile.website}</a></p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {profile.followers && profile.followers !== 'N/A' && profile.followers !== 'Not available' && (
              <span className="bg-purple-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaUsers /> {profile.followers} followers</span>
            )}
            {profile.following && profile.following !== 'N/A' && profile.following !== 'Not available' && (
              <span className="bg-purple-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaArrowRight /> {profile.following} following</span>
            )}
            {profile.posts && profile.posts !== 'N/A' && profile.posts !== 'Not available' && (
              <span className="bg-purple-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaCamera /> {profile.posts} posts</span>
            )}
            {profile.subscribers && profile.subscribers !== 'N/A' && profile.subscribers !== 'Not available' && (
              <span className="bg-red-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaUsers /> {profile.subscribers} subscribers</span>
            )}
            {profile.videos && profile.videos !== 'N/A' && profile.videos !== 'Not available' && (
              <span className="bg-red-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaYoutube /> {profile.videos} videos</span>
            )}
            {profile.views && profile.views !== 'N/A' && profile.views !== 'Not available' && (
              <span className="bg-red-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaEye /> {profile.views} views</span>
            )}
            {profile.karma && profile.karma !== 'N/A' && (
              <span className="bg-orange-900/50 px-3 py-1 rounded-full flex items-center gap-1"><FaStar /> {profile.karma} karma</span>
            )}
            {profile.publicRepos && profile.publicRepos !== 'N/A' && (
              <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1"><FaBox /> {profile.publicRepos} repos</span>
            )}
          </div>

          {profile.createdAt && profile.createdAt !== 'N/A' && (
            <p className="text-gray-500 text-xs mt-3 flex items-center gap-1"><FaCalendar /> Joined: {profile.createdAt}</p>
          )}
          {profile.message && profile.message !== 'Profile data extracted successfully' && (
            <p className="text-blue-400 text-xs mt-1 flex items-center gap-1"><FaInfoCircle /> {profile.message}</p>
          )}
          {profile.found !== undefined && (
            <p className="text-xs mt-1 flex items-center gap-1">
              {profile.found ? <span className="text-green-400">✅ Profile exists</span> : <span className="text-red-400">❌ Profile not found</span>}
            </p>
          )}

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold shadow-lg shadow-purple-500/30"
          >
            <FaGlobe />
            <span>View Profile</span>
            <FaArrowRight />
          </a>
        </div>
      </div>

      {/* Instagram Details */}
      {profile.platform === 'Instagram' && profile.postsData && (
        <InstagramDetails profile={profile} />
      )}
    </div>
  );
}
