import { useState, useEffect } from 'react';
import Header from './components/Header';
import URLShortener from './components/URLShortener';
import QRGenerator from './components/QRGenerator';
import URLResult from './components/URLResult';
import { getShortenedUrls } from './utils/urlUtils';
import type { ShortenedURL } from './types';

function App() {
  const [recentUrl, setRecentUrl] = useState<ShortenedURL | null>(null);
  const [, setUrls] = useState<ShortenedURL[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'shortener' | 'qr'>('shortener');

  useEffect(() => {
    setUrls(getShortenedUrls());
  }, [refreshKey]);

  const handleUrlCreated = (url: ShortenedURL) => {
    setRecentUrl(url);
    setRefreshKey(prev => prev + 1);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Tab Navigation */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab('shortener')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'shortener'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              URL Shortener
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'qr'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              QR Generator
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'shortener' ? (
            <URLShortener onUrlCreated={handleUrlCreated} />
          ) : (
            <QRGenerator />
          )}
        </div>

        {/* Recent Result */}
        {recentUrl && activeTab === 'shortener' && (
          <div className="max-w-6xl mx-auto">
            <URLResult url={recentUrl} />
          </div>
        )}

      

      

        {/* Enhanced Footer */}
        
      </main>
    </div>
  );
}

export default App;