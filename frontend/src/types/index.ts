export interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  customAlias?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface URLStats {
  totalUrls: number;
  totalClicks: number;
  todaysUrls: number;
  todaysClicks: number;
}

export interface BulkURLItem {
  originalUrl: string;
  customAlias?: string;
  error?: string;
}