import React from 'react';
import { Link, QrCode, Sparkles, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-pink-500 rounded-full blur-md animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative container mx-auto px-2 py-2 md:px-4 md:py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2 md:gap-y-0 w-full">
          {/* Left: Logo, Title, Subtitle */}
          <div className="flex flex-col xs:flex-row items-center gap-x-2 gap-y-1 min-w-0 w-full md:w-auto">
            <div className="relative flex-shrink-0 mb-1 xs:mb-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-2xl shadow-xl">
                <Link className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="min-w-0 text-center xs:text-left">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                qrshortner
              </h1>
              <p className="text-slate-300 text-xs md:text-sm font-medium truncate">Advanced URL shortner & QR Generator</p>
            </div>
          </div>
          {/* Right: Feature Highlights (responsive row, scrollable on mobile) */}
          <div className="flex flex-row flex-wrap md:flex-nowrap justify-center md:justify-end items-center gap-2 md:gap-3 w-full md:w-auto mt-2 md:mt-0 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-400">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 min-w-max">
              <QrCode className="h-5 w-5 text-green-400" />
              <span className="text-xs font-semibold">QR Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 min-w-max">
              <span className="inline-block text-blue-400">
                <svg xmlns='http://www.w3.org/2000/svg' className='inline h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18.364 5.636a9 9 0 11-12.728 0M12 3v9' /></svg>
              </span>
              <span className="text-xs font-semibold">Unlimited URLs</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 min-w-max">
              <span className="inline-block text-yellow-400">
                <svg xmlns='http://www.w3.org/2000/svg' className='inline h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg>
              </span>
              <span className="text-xs font-semibold">Instant Generation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 min-w-max">
              <span className="inline-block text-yellow-300">
                <svg xmlns='http://www.w3.org/2000/svg' className='inline h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 17v.01M12 13a4 4 0 100-8 4 4 0 000 8zm0 0v4m0 4h.01' /></svg>
              </span>
              <span className="text-xs font-semibold">Secure & Private</span>
            </div>
          </div>
        </div>
        {/* Feature highlights below header removed for compactness */}
      </div>
    </header>
  );
};

export default Header;