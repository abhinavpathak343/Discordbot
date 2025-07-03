import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle, Share2 } from 'lucide-react';
import { copyToClipboard } from '../utils/urlUtils';
import type { ShortenedURL } from '../types';

interface URLResultProps {
  url: ShortenedURL;
}

const URLResult: React.FC<URLResultProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url.shortUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  

  const handleOpenUrl = () => {
    window.open(url.shortUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this link',
          url: url.shortUrl,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-white gap-y-2 md:gap-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">Success! Your Link is Ready</h3>
                <p className="text-emerald-100 text-xs md:text-base">Share it anywhere, anytime</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-xs md:text-sm font-medium">✨ Premium Quality</span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* URL Information */}
            <div className="space-y-6 flex-1">
              {/* Original URL */}
              <div className="space-y-2">
                <label className="block text-xs md:text-sm font-semibold text-gray-700">Original URL</label>
                <div className="p-3 md:p-4 bg-gray-50 rounded-2xl border-2 border-gray-100">
                  <p className="text-xs md:text-sm text-gray-600 break-all leading-relaxed">{url.originalUrl}</p>
                </div>
              </div>

              {/* Short URL */}
              <div className="space-y-2">
                <label className="block text-xs md:text-sm font-semibold text-gray-700">Your Short URL</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
                    <div className="flex-1 min-w-0 overflow-x-auto">
                      <p className="text-base md:text-lg font-mono font-bold text-blue-700 break-all whitespace-nowrap">{url.shortUrl}</p>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 md:p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={handleOpenUrl}
                        className="p-2 md:p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                        title="Open URL"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleShare}
                        className="p-2 md:p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 hover:scale-105"
                        title="Share"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4 text-xs md:text-sm text-gray-500">
                <span>🔗 Short URL created</span>
              </div>
              {copied && (
                <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 md:px-4 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs md:text-sm font-medium">Copied to clipboard!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLResult;