import { NextApiRequest, NextApiResponse } from 'next';
import { VideoGeneratorService, VideoProvider } from '../../../services/video/video_generator_service';

// API anahtarlarını güvenli bir şekilde saklayın (.env dosyasında)
const LUMEN5_API_KEY = process.env.LUMEN5_API_KEY || '';
const PICTORY_API_KEY = process.env.PICTORY_API_KEY || '';
const INVIDEO_API_KEY = process.env.INVIDEO_API_KEY || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, provider = 'lumen5', options = {} } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Provider'ı kontrol et
    if (!['lumen5', 'pictory', 'invideo'].includes(provider)) {
      return res.status(400).json({ error: 'Invalid provider' });
    }

    const videoGenerator = new VideoGeneratorService(
      LUMEN5_API_KEY,
      PICTORY_API_KEY,
      INVIDEO_API_KEY
    );

    const result = await videoGenerator.generateVideo(
      topic,
      provider as VideoProvider,
      options
    );

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error: any) {
    console.error('API error:', error);
    res.status(500).json({ error: error.message });
  }
}
