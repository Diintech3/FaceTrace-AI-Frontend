const PersonalInfo = ({ results }) => {
  if (!results || !results.profiles || results.profiles.length === 0) return null;

  // Extract personal info from profiles
  const mainProfile = results.profiles[0];
  const name = mainProfile.fullName || mainProfile.name || mainProfile.username || 'Unknown';
  const location = mainProfile.location || results.profiles.find(p => p.location)?.location || 'Not Available';
  
  // Extract emails
  const emails = [];
  if (results.additionalDataSources?.possibleEmails && Array.isArray(results.additionalDataSources.possibleEmails)) {
    emails.push(...results.additionalDataSources.possibleEmails);
  }
  if (results.additionalDataSources?.scrapedEmails?.emails && Array.isArray(results.additionalDataSources.scrapedEmails.emails)) {
    emails.push(...results.additionalDataSources.scrapedEmails.emails);
  }
  
  // Extract phones
  const phones = [];
  if (results.additionalDataSources?.scrapedPhones?.phones && Array.isArray(results.additionalDataSources.scrapedPhones.phones)) {
    phones.push(...results.additionalDataSources.scrapedPhones.phones);
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/70 to-cyan-900/70 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-500/40 mb-6 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        👤 Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="text-sm text-gray-400 mb-1">Full Name</div>
          <div className="text-lg font-bold text-white">{name}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="text-sm text-gray-400 mb-1">Username</div>
          <div className="text-lg font-bold text-white">{results.username || mainProfile.username}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="text-sm text-gray-400 mb-1">Location</div>
          <div className="text-lg font-bold text-white">{location}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="text-sm text-gray-400 mb-1">Total Profiles Found</div>
          <div className="text-lg font-bold text-blue-400">{results.totalFound} platforms</div>
        </div>

        {emails.length > 0 && (
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 md:col-span-2">
            <div className="text-sm text-gray-400 mb-2">Email Addresses</div>
            <div className="space-y-1">
              {emails.slice(0, 3).map((email, idx) => (
                <div key={idx} className="text-white font-semibold">📧 {email}</div>
              ))}
            </div>
          </div>
        )}

        {phones.length > 0 && (
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 md:col-span-2">
            <div className="text-sm text-gray-400 mb-2">Phone Numbers</div>
            <div className="space-y-1">
              {phones.slice(0, 3).map((phone, idx) => (
                <div key={idx} className="text-white font-semibold">📱 {phone}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
