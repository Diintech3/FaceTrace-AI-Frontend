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
import { searchByUsername, searchByUrl, searchByImage, validatePhone, lookupIP, analyzeWebsite } from './utils/api';
import WebsiteAnalyzer from './components/WebsiteAnalyzer/WebsiteAnalyzer';
import './App.css';

function App() {
  const [searchType, setSearchType] = useState('username');
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [phone, setPhone] = useState('');
  const [ip, setIp] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [showWebsiteAnalyzer, setShowWebsiteAnalyzer] = useState(false);
  const [results, setResults] = useState(null);
  const [phoneData, setPhoneData] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [websiteData, setWebsiteData] = useState(null);
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
    setWebsiteData(null);
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
      } else if (searchType === 'website') {
        setShowWebsiteAnalyzer(true);
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
            websiteUrl={websiteUrl}
            setWebsiteUrl={setWebsiteUrl}
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

          {/* Website Analyzer */}
          {searchType === 'website' && showWebsiteAnalyzer && (
            <WebsiteAnalyzer 
              websiteUrl={websiteUrl}
              onAnalysisComplete={(data) => {
                console.log('Analysis complete:', data);
                setWebsiteData(data);
                setShowWebsiteAnalyzer(false);
              }}
            />
          )}

          {/* Results */}
          {phoneData && <PhoneDetails phoneData={phoneData} />}
          {ipData && <IPDetails ipData={ipData} />}
          
          {/* Website Results */}
          {websiteData && (
            <div className="mt-8 bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/40 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">🌐 Website Intelligence Report</h2>
              
              {websiteData.success === false && (
                <div className="bg-red-900/40 rounded-xl p-6 border border-red-500/30 mb-6">
                  <h3 className="text-xl font-bold mb-2 text-red-400">❌ Error</h3>
                  <p className="text-sm text-gray-200">{websiteData.error}</p>
                </div>
              )}
              
              {websiteData.success && (
                <div className="grid gap-6">
                  {/* Basic Info */}
                  <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">📄 Basic Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Title:</span> <span className="text-white font-semibold">{websiteData.pageInfo?.title}</span></p>
                      <p><span className="text-gray-400">URL:</span> <span className="text-blue-300">{websiteData.pageInfo?.url}</span></p>
                      <p><span className="text-gray-400">Description:</span> <span className="text-gray-200">{websiteData.pageInfo?.description || 'N/A'}</span></p>
                      <p><span className="text-gray-400">Links:</span> <span className="text-white">{websiteData.pageInfo?.links}</span></p>
                      <p><span className="text-gray-400">Images:</span> <span className="text-white">{websiteData.pageInfo?.images}</span></p>
                    </div>
                  </div>

                  {/* Screenshots */}
                  {websiteData.screenshots && websiteData.screenshots.length > 0 && (
                    <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                      <h3 className="text-xl font-bold mb-4 text-blue-400">📸 Screenshots ({websiteData.screenshots.length} total)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {websiteData.screenshots.map((screenshot, idx) => (
                          <div key={idx} className="bg-black/60 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
                            <img 
                              src={`http://localhost:3000${screenshot.url}`} 
                              alt={screenshot.description || `Screenshot ${screenshot.position}`}
                              className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => window.open(`http://localhost:3000${screenshot.url}`, '_blank')}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300/1a1a2e/ffffff?text=Screenshot+' + screenshot.position;
                              }}
                            />
                            <div className="p-3 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-blue-400">
                                  {screenshot.pageTitle || `Position: ${screenshot.position}`}
                                  {screenshot.percentage && ` (${screenshot.percentage}%)`}
                                </p>
                              </div>
                              {screenshot.description && (
                                <p className="text-xs text-gray-400 line-clamp-2">{screenshot.description}</p>
                              )}
                              {screenshot.visibleContent && screenshot.visibleContent.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  <p className="text-xs font-semibold text-green-400">Visible Content:</p>
                                  {screenshot.visibleContent.slice(0, 3).map((content, cidx) => (
                                    <p key={cidx} className="text-xs text-gray-300 truncate">• {content}</p>
                                  ))}
                                </div>
                              )}
                              {screenshot.pageUrl && (
                                <p className="text-xs text-purple-400 truncate" title={screenshot.pageUrl}>
                                  🔗 {screenshot.pageUrl}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {websiteData.contactInfo && (
                    <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                      <h3 className="text-xl font-bold mb-4 text-blue-400">📞 Contact Information</h3>
                      <div className="space-y-3">
                        {websiteData.contactInfo.emails?.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2 font-semibold">📧 Emails ({websiteData.contactInfo.emails.length}):</p>
                            <div className="flex flex-wrap gap-2">
                              {websiteData.contactInfo.emails.map((email, idx) => (
                                <a key={idx} href={`mailto:${email}`} className="bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1 rounded-full text-xs text-blue-300 transition-all">{email}</a>
                              ))}
                            </div>
                          </div>
                        )}
                        {websiteData.contactInfo.phones?.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2 font-semibold">📱 Phones ({websiteData.contactInfo.phones.length}):</p>
                            <div className="flex flex-wrap gap-2">
                              {websiteData.contactInfo.phones.map((phone, idx) => (
                                <a key={idx} href={`tel:${phone}`} className="bg-green-500/20 hover:bg-green-500/30 px-3 py-1 rounded-full text-xs text-green-300 transition-all">{phone}</a>
                              ))}
                            </div>
                          </div>
                        )}
                        {websiteData.contactInfo.whatsapp?.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2 font-semibold">💬 WhatsApp ({websiteData.contactInfo.whatsapp.length}):</p>
                            <div className="flex flex-wrap gap-2">
                              {websiteData.contactInfo.whatsapp.map((wa, idx) => (
                                <span key={idx} className="bg-green-600/20 px-3 py-1 rounded-full text-xs text-green-400">{wa}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Internal Pages Discovered */}
                  {websiteData.internalPages && websiteData.internalPages.length > 0 && (
                    <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                      <h3 className="text-xl font-bold mb-4 text-blue-400">🔗 Internal Pages Discovered ({websiteData.internalPages.length})</h3>
                      <div className="space-y-2">
                        {websiteData.internalPages.map((page, idx) => (
                          <a key={idx} href={page} target="_blank" rel="noopener noreferrer" 
                             className="block bg-black/60 hover:bg-black/80 px-4 py-2 rounded-lg text-sm text-blue-300 hover:text-blue-200 transition-all truncate">
                            {idx + 1}. {page}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Media */}
                  {websiteData.socialMedia && Object.values(websiteData.socialMedia).some(v => v) && (
                    <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                      <h3 className="text-xl font-bold mb-4 text-blue-400">🔗 Social Media Links</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(websiteData.socialMedia).map(([platform, url]) => url && (
                          <a key={platform} href={url} target="_blank" rel="noopener noreferrer" 
                             className="bg-purple-500/20 hover:bg-purple-500/30 px-4 py-2 rounded-lg text-sm text-purple-300 transition-all">
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Analysis */}
                  {websiteData.aiAnalysis?.success && websiteData.aiAnalysis.analysis && (
                    <div className="bg-black/40 rounded-xl p-6 border border-purple-500/30">
                      <h3 className="text-xl font-bold mb-4 text-purple-400">🤖 AI Analysis</h3>
                      <div className="space-y-4">
                        {(() => {
                          try {
                            let jsonStr = websiteData.aiAnalysis.analysis;
                            jsonStr = jsonStr.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
                            jsonStr = jsonStr.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                            const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
                            if (jsonMatch) jsonStr = jsonMatch[0];
                            const analysis = JSON.parse(jsonStr);
                            
                            return (
                              <>
                                {analysis.executiveSummary && (
                                  <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-lg p-5 border border-cyan-500/20">
                                    <h4 className="text-base font-bold text-cyan-300 mb-3 flex items-center gap-2"><span>📊</span> Executive Summary</h4>
                                    <p className="text-sm text-gray-100 leading-relaxed">{analysis.executiveSummary}</p>
                                  </div>
                                )}
                                
                                {analysis.websiteDetails && (
                                  <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg p-5 border border-blue-500/20">
                                    <h4 className="text-base font-bold text-blue-300 mb-3 flex items-center gap-2"><span>🌐</span> Website Details</h4>
                                    <div className="space-y-3 text-sm">
                                      {analysis.websiteDetails.purpose && <div><p className="text-gray-400 font-semibold mb-1">Purpose:</p><p className="text-gray-100 leading-relaxed">{analysis.websiteDetails.purpose}</p></div>}
                                      {analysis.websiteDetails.businessType && <div><p className="text-gray-400 font-semibold mb-1">Business Type:</p><p className="text-gray-100">{analysis.websiteDetails.businessType}</p></div>}
                                      {analysis.websiteDetails.industry && <div><p className="text-gray-400 font-semibold mb-1">Industry:</p><p className="text-gray-100">{analysis.websiteDetails.industry}</p></div>}
                                      {analysis.websiteDetails.targetAudience && <div><p className="text-gray-400 font-semibold mb-1">Target Audience:</p><p className="text-gray-100 leading-relaxed">{analysis.websiteDetails.targetAudience}</p></div>}
                                      {analysis.websiteDetails.mainServices?.length > 0 && <div><p className="text-gray-400 font-semibold mb-2">Main Services:</p><ul className="list-disc list-inside space-y-1 text-gray-100">{analysis.websiteDetails.mainServices.map((s, i) => <li key={i}>{s}</li>)}</ul></div>}
                                    </div>
                                  </div>
                                )}
                                
                                {analysis.keyFeatures?.length > 0 && (
                                  <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg p-5 border border-green-500/20">
                                    <h4 className="text-base font-bold text-green-300 mb-3 flex items-center gap-2"><span>✨</span> Key Features</h4>
                                    <ul className="space-y-2">{analysis.keyFeatures.map((f, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-100"><span className="text-green-400 mt-0.5">▸</span><span className="leading-relaxed">{f}</span></li>)}</ul>
                                  </div>
                                )}
                                
                                {analysis.contentAnalysis && (
                                  <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-lg p-5 border border-indigo-500/20">
                                    <h4 className="text-base font-bold text-indigo-300 mb-3 flex items-center gap-2"><span>📝</span> Content Analysis</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                      {analysis.contentAnalysis.quality && <div><p className="text-gray-400 font-semibold">Quality:</p><p className="text-gray-100">{analysis.contentAnalysis.quality}</p></div>}
                                      {analysis.contentAnalysis.professionalism && <div><p className="text-gray-400 font-semibold">Professionalism:</p><p className="text-gray-100">{analysis.contentAnalysis.professionalism}</p></div>}
                                      {analysis.contentAnalysis.completeness && <div><p className="text-gray-400 font-semibold">Completeness:</p><p className="text-gray-100">{analysis.contentAnalysis.completeness}</p></div>}
                                      {analysis.contentAnalysis.userExperience && <div><p className="text-gray-400 font-semibold">User Experience:</p><p className="text-gray-100">{analysis.contentAnalysis.userExperience}</p></div>}
                                    </div>
                                  </div>
                                )}
                                
                                {analysis.trustAndCredibility && (
                                  <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-lg p-5 border border-yellow-500/20">
                                    <h4 className="text-base font-bold text-yellow-300 mb-3 flex items-center gap-2"><span>🛡️</span> Trust & Credibility</h4>
                                    <div className="space-y-3 text-sm">
                                      {analysis.trustAndCredibility.trustScore && <div className="bg-black/30 rounded-lg p-3"><p className="text-gray-400 font-semibold mb-1">Trust Score:</p><p className="text-white font-bold text-lg">{analysis.trustAndCredibility.trustScore}</p></div>}
                                      {analysis.trustAndCredibility.contactability && <div><p className="text-gray-400 font-semibold mb-1">Contactability:</p><p className="text-gray-100">{analysis.trustAndCredibility.contactability}</p></div>}
                                      {analysis.trustAndCredibility.positiveSignals?.length > 0 && <div><p className="text-green-400 font-semibold mb-2">✓ Positive Signals:</p><ul className="space-y-1 text-gray-100">{analysis.trustAndCredibility.positiveSignals.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-green-400">•</span><span>{s}</span></li>)}</ul></div>}
                                      {analysis.trustAndCredibility.negativeSignals?.length > 0 && <div><p className="text-red-400 font-semibold mb-2">⚠ Negative Signals:</p><ul className="space-y-1 text-gray-100">{analysis.trustAndCredibility.negativeSignals.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-red-400">•</span><span>{s}</span></li>)}</ul></div>}
                                    </div>
                                  </div>
                                )}
                                
                                {analysis.technicalAssessment && (
                                  <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-lg p-5 border border-orange-500/20">
                                    <h4 className="text-base font-bold text-orange-300 mb-3 flex items-center gap-2"><span>⚙️</span> Technical Assessment</h4>
                                    <div className="space-y-3 text-sm">
                                      {analysis.technicalAssessment.technologyStack && <div><p className="text-gray-400 font-semibold mb-1">Technology Stack:</p><p className="text-gray-100 leading-relaxed">{analysis.technicalAssessment.technologyStack}</p></div>}
                                      {analysis.technicalAssessment.modernization && <div><p className="text-gray-400 font-semibold mb-1">Modernization:</p><p className="text-gray-100 leading-relaxed">{analysis.technicalAssessment.modernization}</p></div>}
                                      {analysis.technicalAssessment.performance && <div><p className="text-gray-400 font-semibold mb-1">Performance:</p><p className="text-gray-100">{analysis.technicalAssessment.performance}</p></div>}
                                      {analysis.technicalAssessment.seoOptimization && <div><p className="text-gray-400 font-semibold mb-1">SEO:</p><p className="text-gray-100">{analysis.technicalAssessment.seoOptimization}</p></div>}
                                    </div>
                                  </div>
                                )}
                                
                                {analysis.recommendations?.length > 0 && (
                                  <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg p-5 border border-purple-500/20">
                                    <h4 className="text-base font-bold text-purple-300 mb-3 flex items-center gap-2"><span>💡</span> Recommendations</h4>
                                    <ul className="space-y-2">{analysis.recommendations.map((r, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-100"><span className="text-purple-400 mt-0.5">{i+1}.</span><span className="leading-relaxed">{r}</span></li>)}</ul>
                                  </div>
                                )}
                                
                                {analysis.overallAssessment && (
                                  <div className="bg-gradient-to-r from-pink-900/40 to-rose-900/40 rounded-lg p-5 border border-pink-500/20">
                                    <h4 className="text-base font-bold text-pink-300 mb-3 flex items-center gap-2"><span>🎯</span> Overall Assessment</h4>
                                    <p className="text-sm text-gray-100 leading-relaxed">{analysis.overallAssessment}</p>
                                  </div>
                                )}
                                
                                {analysis.redFlags?.length > 0 && (
                                  <div className="bg-gradient-to-r from-red-900/40 to-rose-900/40 rounded-lg p-5 border border-red-500/30">
                                    <h4 className="text-base font-bold text-red-300 mb-3 flex items-center gap-2"><span>🚩</span> Red Flags</h4>
                                    <ul className="space-y-2">{analysis.redFlags.map((f, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-100"><span className="text-red-400 mt-0.5">⚠</span><span className="leading-relaxed">{f}</span></li>)}</ul>
                                  </div>
                                )}
                              </>
                            );
                          } catch (e) {
                            console.error('JSON parse error:', e);
                            return <div className="bg-black/60 rounded-lg p-4"><pre className="text-sm text-gray-200 whitespace-pre-wrap">{websiteData.aiAnalysis.analysis}</pre></div>;
                          }
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {websiteData.technologies && Array.isArray(websiteData.technologies) && websiteData.technologies.length > 0 && (
                    <div className="bg-black/40 rounded-xl p-6 border border-blue-500/30">
                      <h3 className="text-xl font-bold mb-4 text-blue-400">⚙️ Technologies Detected</h3>
                      <div className="flex flex-wrap gap-2">
                        {websiteData.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-orange-500/20 px-3 py-1 rounded-full text-xs text-orange-300">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Domain Information */}
                  {websiteData.domainInfo && (
                    <div className="bg-black/40 rounded-xl p-6 border border-green-500/30">
                      <h3 className="text-xl font-bold mb-4 text-green-400">🌍 Domain Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Domain:</p>
                          <p className="text-white font-semibold">{websiteData.domainInfo.domain}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Registrar:</p>
                          <p className="text-white">{websiteData.domainInfo.registrar}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Created:</p>
                          <p className="text-white">{websiteData.domainInfo.createdDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Expires:</p>
                          <p className="text-white">{websiteData.domainInfo.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Updated:</p>
                          <p className="text-white">{websiteData.domainInfo.updatedDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Country:</p>
                          <p className="text-white">{websiteData.domainInfo.registrantCountry}</p>
                        </div>
                        {websiteData.domainInfo.registrantName !== 'Unknown' && (
                          <div className="md:col-span-2">
                            <p className="text-gray-400">Registrant:</p>
                            <p className="text-white">{websiteData.domainInfo.registrantName} ({websiteData.domainInfo.registrantOrg})</p>
                          </div>
                        )}
                        {websiteData.domainInfo.registrantEmail !== 'Unknown' && (
                          <div>
                            <p className="text-gray-400">Registrant Email:</p>
                            <p className="text-white">{websiteData.domainInfo.registrantEmail}</p>
                          </div>
                        )}
                        {websiteData.domainInfo.registrantPhone !== 'Unknown' && (
                          <div>
                            <p className="text-gray-400">Registrant Phone:</p>
                            <p className="text-white">{websiteData.domainInfo.registrantPhone}</p>
                          </div>
                        )}
                        {websiteData.domainInfo.nameServers?.length > 0 && (
                          <div className="md:col-span-2">
                            <p className="text-gray-400 mb-2">Name Servers:</p>
                            <div className="flex flex-wrap gap-2">
                              {websiteData.domainInfo.nameServers.map((ns, idx) => (
                                <span key={idx} className="bg-green-500/20 px-3 py-1 rounded-full text-xs text-green-300">{ns}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Server Information */}
                  {websiteData.serverInfo && (
                    <div className="bg-black/40 rounded-xl p-6 border border-yellow-500/30">
                      <h3 className="text-xl font-bold mb-4 text-yellow-400">🖥️ Server Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Server:</p>
                          <p className="text-white font-semibold">{websiteData.serverInfo.server}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Powered By:</p>
                          <p className="text-white">{websiteData.serverInfo.poweredBy}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-gray-400">Content Type:</p>
                          <p className="text-white">{websiteData.serverInfo.contentType}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
