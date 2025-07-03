import QRCode from 'qrcode';
import type { ShortenedURL } from '../types';

const STORAGE_KEY = 'shortened_urls';

export const generateShortCode = (length = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const generateQRCode = async (url: string, options?: any): Promise<string> => {
  try {
    const defaultOptions = {
      width: 200,
      margin: 2,
      color: {
        dark: '#1e40af',
        light: '#ffffff'
      }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    return await QRCode.toDataURL(url, finalOptions);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
};

export const getShortenedUrls = (): ShortenedURL[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const urls = JSON.parse(stored);
    return urls.map((url: any) => ({
      ...url,
      createdAt: new Date(url.createdAt),
      expiresAt: url.expiresAt ? new Date(url.expiresAt) : undefined
    }));
  } catch {
    return [];
  }
};

export const saveShortenedUrl = (url: ShortenedURL): void => {
  const existing = getShortenedUrls();
  existing.unshift(url);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const updateUrlClicks = (id: string): void => {
  const urls = getShortenedUrls();
  const urlIndex = urls.findIndex(url => url.id === id);
  if (urlIndex !== -1) {
    urls[urlIndex].clicks += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  }
};

export const deleteUrl = (id: string): void => {
  const urls = getShortenedUrls().filter(url => url.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

export const downloadQRCode = (qrCode: string, filename: string): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = qrCode;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getUrlStats = (): any => {
  const urls = getShortenedUrls();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysUrls = urls.filter(url => 
    new Date(url.createdAt).getTime() >= today.getTime()
  );
  
  return {
    totalUrls: urls.length,
    totalClicks: urls.reduce((sum, url) => sum + url.clicks, 0),
    todaysUrls: todaysUrls.length,
    todaysClicks: todaysUrls.reduce((sum, url) => sum + url.clicks, 0)
  };
};