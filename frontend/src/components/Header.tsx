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
      
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 md:gap-y-0">
          {/* Left: Logo, Title, Subtitle */}
          <div className="flex items-center gap-x-4 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl">
                <Link className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                qrshortner
              </h1>
              <p className="text-slate-300 text-base font-medium truncate">Advanced URL shortner & QR Generator</p>
            </div>
          </div>
          {/* Right: Feature Highlights */}
          <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-semibold">Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <QrCode className="h-5 w-5 text-green-400" />
              <span className="text-sm font-semibold">QR Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-semibold">Premium Features</span>
            </div>
          </div>
        </div>
        {/* Feature highlights */}
        <div className="mt-6 flex flex-row gap-4 justify-center items-stretch">
          <div className="flex-1 min-w-[180px] max-w-xs flex flex-col items-center justify-center bg-gradient-to-br from-purple-700/60 via-purple-800/60 to-slate-900/60 rounded-2xl border border-purple-400/30 shadow-lg px-4 py-5 mx-1">
            <div className="text-2xl mb-1"><span className="text-blue-400"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18.364 5.636a9 9 0 11-12.728 0M12 3v9' /></svg></span></div>
            <div className="text-sm text-slate-100 font-medium">Unlimited URLs</div>
          </div>
          <div className="flex-1 min-w-[180px] max-w-xs flex flex-col items-center justify-center bg-gradient-to-br from-purple-700/60 via-purple-800/60 to-slate-900/60 rounded-2xl border border-purple-400/30 shadow-lg px-4 py-5 mx-1">
            <div className="text-2xl mb-1"><span className="text-yellow-400"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg></span></div>
            <div className="text-sm text-slate-100 font-medium">Instant Generation</div>
          </div>
          <div className="flex-1 min-w-[180px] max-w-xs flex flex-col items-center justify-center bg-gradient-to-br from-purple-700/60 via-purple-800/60 to-slate-900/60 rounded-2xl border border-purple-400/30 shadow-lg px-4 py-5 mx-1">
            <div className="text-2xl mb-1"><span className="text-yellow-300"><svg xmlns='http://www.w3.org/2000/svg' className='inline h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 17v.01M12 13a4 4 0 100-8 4 4 0 000 8zm0 0v4m0 4h.01' /></svg></span></div>
            <div className="text-sm text-slate-100 font-medium">Secure & Private</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;