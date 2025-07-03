import React, { useState } from 'react';
import axios from 'axios';
import { Link2, Sparkles, AlertCircle, CheckCircle, Zap, Globe } from 'lucide-react';
import { isValidUrl, saveShortenedUrl } from '../utils/urlUtils';
import type { ShortenedURL } from '../types';


interface URLShortenerProps {
  onUrlCreated: (url: ShortenedURL) => void;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL; // Use the correct backend API base

const URLShortener: React.FC<URLShortenerProps> = ({ onUrlCreated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [shortened, setShortened] = useState<ShortenedURL | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!originalUrl.trim()) {
      setError('Please enter a URL to shorten');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (must include http:// or https://)');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create short URL (get shortUrl from backend)
      const res = await axios.post(`${API_BASE}`, { url: originalUrl });
      const shortCode = customAlias.trim() || res.data.id;
      const shortUrl = res.data.shortUrl;

      const newUrl: ShortenedURL = {
        id: Date.now().toString(),
        originalUrl: originalUrl.trim(),
        shortCode,
        shortUrl,
        customAlias: customAlias.trim() || undefined,
        createdAt: new Date()
      };

      saveShortenedUrl(newUrl);
      onUrlCreated(newUrl);
      setShortened(newUrl);
      setOriginalUrl('');
      setCustomAlias('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to create short URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 sm:gap-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Link2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Create Short Link
                </h2>
                <p className="text-sm text-gray-500">Transform long URLs into powerful short links</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Instant</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* URL Input */}
          <div className="space-y-3">
            <label htmlFor="original-url" className="block text-sm font-semibold text-gray-700">
              Enter your long URL
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 flex items-center">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="original-url"
                  type="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/your-very-long-url-here"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

       

          {/* Error/Success Messages */}
          {error && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700 font-medium">{error}</span>
            </div>
          )}

          {success && shortened && (
            <div className="flex flex-col items-center justify-center mt-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-xl font-semibold">
                <span>Short URL:</span>
                <a href={shortened.shortUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{shortened.shortUrl}</a>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative px-8 py-4 text-white font-semibold rounded-2xl">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Magic...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span>Shorten URL</span>
                </div>
              )}
            </div>
          </button>

          {/* Features */}
         
        </form>
      </div>
    </div>
  );
};

export default URLShortener;