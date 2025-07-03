import React, { useState } from 'react';
import axios from 'axios';
import { QrCode, Download, Copy, Palette, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { copyToClipboard, downloadQRCode } from '../utils/urlUtils';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const QRGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState('#1e40af');
  const [bgColor, setBgColor] = useState('#ffffff');

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter text or URL to generate QR code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const qrRes = await axios.post(`${API_BASE}/qr`, {
        text,
        options: {
          width: qrSize,
          color: {
            dark: qrColor,
            light: bgColor
          }
        }
      });
      setQrCode(qrRes.data.qrCode);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to generate QR code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (qrCode) {
      const success = await copyToClipboard(qrCode);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (qrCode) {
      downloadQRCode(qrCode, `qr-code-${Date.now()}.png`);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 via-teal-50 to-blue-50 px-8 py-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 sm:gap-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-2 rounded-xl">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  QR Code Generator
                </h2>
                <p className="text-sm text-gray-500">Create custom QR codes for any text or URL</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-2 rounded-full">
              <Palette className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">Customizable</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Input Section */}
          <div className="space-y-3">
            <label htmlFor="qr-text" className="block text-sm font-semibold text-gray-700">
              Enter text or URL
            </label>
            <div className="relative">
              <textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter any text, URL, or data to generate QR code..."
                rows={3}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Customization Options */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="qr-size-select">Size</label>
              <select
                id="qr-size-select"
                title="Select QR code size"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                <option value={150}>Small (150px)</option>
                <option value={200}>Medium (200px)</option>
                <option value={300}>Large (300px)</option>
                <option value={400}>Extra Large (400px)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="qr-color-input">QR Color</label>
              <div className="flex items-center space-x-2">
                <input
                  id="qr-color-input"
                  type="color"
                  title="Pick QR code color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  title="QR code color hex value"
                  placeholder="#1e40af"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="flex-1 px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="qr-bgcolor-input">Background</label>
              <div className="flex items-center space-x-2">
                <input
                  id="qr-bgcolor-input"
                  type="color"
                  title="Pick QR code background color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  title="QR code background color hex value"
                  placeholder="#ffffff"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700 font-medium">{error}</span>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateQR}
            disabled={isLoading}
            className="relative w-full group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-teal-700 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative px-8 py-4 text-white font-semibold rounded-2xl">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating QR Code...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <QrCode className="h-5 w-5" />
                  <span>Generate QR Code</span>
                  <Settings className="h-5 w-5" />
                </div>
              )}
            </div>
          </button>

          {/* QR Code Display */}
          {qrCode && (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100">
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
                  <img 
                    src={qrCode} 
                    alt="Generated QR Code" 
                    className="max-w-full h-auto"
                    style={{ width: qrSize, height: qrSize }}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Image'}</span>
                  </button>
                  
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PNG</span>
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    QR Code generated for: <span className="font-medium text-gray-800">{text.length > 50 ? text.substring(0, 50) + '...' : text}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;