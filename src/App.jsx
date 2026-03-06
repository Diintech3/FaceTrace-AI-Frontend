import { useState } from 'react';
import Header from './components/Header';
import SearchTypeSelector from './components/SearchForm/SearchTypeSelector';
import SearchInput from './components/SearchForm/SearchInput';
import ProfileCard from './components/Results/ProfileCard';
import AIBiodata from './components/Results/AIBiodata';
import PhoneDetails from './components/Results/PhoneDetails';
import IPDetails from './components/Results/IPDetails';
import PersonalInfo from './components/Results/PersonalInfo';
import SocialMediaLinks from './components/Results/SocialMediaLinks';
import FaceSearchResults from './components/Results/FaceSearchResults';
import SimilarFacesGrid from './components/FaceAnalyzer/SimilarFacesGrid';
import { searchByUsername, searchByUrl, searchByImage, validatePhone, lookupIP } from './utils/api';
import './App.css';

function App() {
  const [searchType, setSearchType] = useState('username');
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [phone, setPhone] = useState('');
  const [ip, setIp] = useState('');
  const [results, setResults] = useState(null);
  const [phoneData, setPhoneData] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState('');
  const [similarFaces, setSimilarFaces] = useState(null);
  const [analyzingFace, setAnalyzingFace] = useState(false);

  const handleFaceSelection = async (selectedImage) => {
    window.open(selectedImage.link || selectedImage.url, '_blank');
  };

  const handleSearch = async () => {
    setLoading(true);
    setResults(null);
    setPhoneData(null);
    setIpData(null);
    setScanProgress('');

    try {
      let responseData;
      
      if (searchType === 'username') {
        setScanProgress('🔍 Searching across social media platforms...');
        const response = await searchByUsername(username);
        console.log('Username search response:', response);
        responseData = response.data || response;
      } else if (searchType === 'url') {
        setScanProgress('🔍 Analyzing profile URL with Cheerio & Axios...');
        const response = await searchByUrl(profileUrl);
        console.log('URL search response:', response);
        
        if (response.success && response.data) {
          responseData = {
            profiles: [response.data],
            totalFound: 1,
            username: response.data.username || response.data.name || 'Unknown',
            searchedAt: new Date().toISOString()
          };
        }
      } else if (searchType === 'image' && image) {
        setAnalyzingFace(true);
        setSimilarFaces(null);
        setResults(null);
        setScanProgress('📸 Analyzing face...');
        
        const response = await searchByImage(image);
        console.log('Image search response:', response);
        responseData = response.data || response;
        
        setAnalyzingFace(false);
        
        if (responseData.similarFaces && responseData.similarFaces.length > 0) {
          setSimilarFaces(responseData.similarFaces);
          setResults(responseData);
          setLoading(false);
          return;
        }
      } else if (searchType === 'phone') {
        setScanProgress('📱 Validating phone number...');
        const response = await validatePhone(phone);
        console.log('Phone validation response:', response);
        setPhoneData(response.data);
        setScanProgress('✅ Validation complete!');
        setLoading(false);
        return;
      } else if (searchType === 'ip') {
        setScanProgress('🌍 Looking up IP address...');
        const response = await lookupIP(ip);
        console.log('IP lookup response:', response);
        setIpData(response.data);
        setScanProgress('✅ Lookup complete!');
        setLoading(false);
        return;
      }

      console.log('Final results to display:', responseData);
      setResults(responseData);
      setScanProgress('✅ Scan complete!');
    } catch (error) {
      console.error('Search error:', error);
      setScanProgress('❌ Search failed');
      alert('Search failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] animate-grid"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <SearchTypeSelector searchType={searchType} setSearchType={setSearchType} />
          
          <SearchInput
            searchType={searchType}
            username={username}
            setUsername={setUsername}
            profileUrl={profileUrl}
            setProfileUrl={setProfileUrl}
            image={image}
            setImage={setImage}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            phone={phone}
            setPhone={setPhone}
            ip={ip}
            setIp={setIp}
            loading={loading}
            scanProgress={scanProgress}
            onSearch={handleSearch}
          />

          {/* Similar Faces Grid - Show during analyzing or when results available */}
          {(analyzingFace || (similarFaces && similarFaces.length > 0)) && (
            <SimilarFacesGrid 
              similarImages={similarFaces || []} 
              onSelectImage={handleFaceSelection}
              loading={analyzingFace}
              uploadedImage={imagePreview}
            />
          )}

          {/* Results */}
          {phoneData && <PhoneDetails phoneData={phoneData} />}
          {ipData && <IPDetails ipData={ipData} />}

          {/* FaceCheck.id Results */}
          {results && results.faceCheckResults && (
            <FaceSearchResults faceCheckResults={results.faceCheckResults} />
          )}

          {results && results.profiles && results.profiles.length > 0 && (
            <div className="mt-8">
              <details className="bg-black/30 rounded-2xl p-6 border border-gray-700/50 mb-6">
                <summary className="cursor-pointer text-sm font-semibold text-gray-200">
                  📦 Show full API response (raw JSON)
                </summary>
                <pre className="mt-4 text-xs whitespace-pre-wrap break-words text-gray-200 max-h-[420px] overflow-auto bg-black/40 p-4 rounded-xl border border-gray-700/60">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </details>

              {/* AI Biodata */}
              {results.aiBiodata && <AIBiodata aiBiodata={results.aiBiodata} />}

              {/* Personal Information Card */}
              <PersonalInfo results={results} />

              {/* Social Media Links Card */}
              <SocialMediaLinks profiles={results.profiles} />

              <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-purple-500/40 mb-6 sm:mb-8 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">🎯 Investigation Results</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                    <div className="text-3xl sm:text-5xl font-bold text-purple-400 mb-2">{results.totalFound}</div>
                    <div className="text-gray-300 text-xs sm:text-sm font-medium">Profiles Found</div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">📊 Detailed Profiles ({results.totalFound} platforms)</h2>
              <div className="grid gap-4 sm:gap-6">
                {results.profiles.map((profile, index) => (
                  <ProfileCard key={index} profile={profile} />
                ))}
              </div>
            </div>
          )}

          {results && (!results.profiles || results.profiles.length === 0) && (
            <div className="mt-8 text-center p-12 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl font-bold text-gray-300 mb-2">No Social Media Profiles Found</p>
              <p className="text-gray-500">Try a different username or check the console for errors</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
