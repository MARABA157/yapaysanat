import { Redis } from '@upstash/redis';

interface CacheConfig {
  url: string;
  token: string;
  ttl?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheManager {
  private redis: Redis;
  private defaultTTL: number;
  private cache: Map<string, CacheEntry<any>>;
  private maxEntries: number;

  constructor(config: CacheConfig, maxEntries: number = 1000) {
    this.redis = new Redis({
      url: config.url,
      token: config.token,
    });
    this.defaultTTL = config.ttl || 3600; // Varsayılan 1 saat
    this.cache = new Map();
    this.maxEntries = maxEntries;
  }

  private evictOldest(): void {
    const entries = Array.from(this.cache.entries());
    if (entries.length > 0) {
      const oldest = entries.reduce((a, b) => 
        a[1].timestamp < b[1].timestamp ? a : b
      );
      this.cache.delete(oldest[0]);
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      if (this.cache.size >= this.maxEntries) {
        this.evictOldest();
      }

      this.cache.set(key, {
        data: value,
        timestamp: Date.now(),
        ttl: (ttl || this.defaultTTL) * 1000,
      });

      await this.redis.set(key, JSON.stringify(value), {
        ex: ttl || this.defaultTTL,
      });
    } catch (error) {
      console.error('Cache set error:', error);
      throw new Error('Veri önbelleğe eklenirken bir hata oluştu');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const entry = this.cache.get(key);
      if (!entry) {
        const value = await this.redis.get<string>(key);
        return value ? JSON.parse(value) : null;
      }

      const now = Date.now();
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        await this.redis.del(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Cache get error:', error);
      throw new Error('Veri önbellekten alınırken bir hata oluştu');
    }
  }

  async delete(key: string): Promise<void> {
    try {
      this.cache.delete(key);
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
      throw new Error('Veri önbellekten silinirken bir hata oluştu');
    }
  }

  async clear(): Promise<void> {
    try {
      this.cache.clear();
      await this.redis.flushall();
    } catch (error) {
      console.error('Cache clear error:', error);
      throw new Error('Önbellek temizlenirken bir hata oluştu');
    }
  }

  async keys(pattern: string = '*'): Promise<string[]> {
    try {
      return await this.redis.keys(pattern);
    } catch (error) {
      console.error('Cache keys error:', error);
      throw new Error('Önbellek anahtarları listelenirken bir hata oluştu');
    }
  }

  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    try {
      const cachedValue = await this.get<T>(key);
      if (cachedValue !== null) return cachedValue;

      const freshValue = await fetchFn();
      await this.set(key, freshValue, ttl);
      return freshValue;
    } catch (error) {
      console.error('Cache getOrSet error:', error);
      throw new Error('Önbellek işlemi sırasında bir hata oluştu');
    }
  }
}

export const pageCache = new CacheManager({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
  ttl: 3600, // 1 saat
});

export const apiCache = new CacheManager({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
  ttl: 300, // 5 dakika
});

export const sessionCache = new CacheManager({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
  ttl: 86400, // 24 saat
});
