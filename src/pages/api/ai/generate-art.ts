import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const SD_API_URL = 'http://localhost:7860';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    const response = await axios.post(`${SD_API_URL}/sdapi/v1/txt2img`, {
      prompt: prompt || "a beautiful horse in a meadow, high quality, detailed",
      negative_prompt: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
      steps: 20,
      width: 512,
      height: 512,
      cfg_scale: 7,
    });

    if (response.data && response.data.images && response.data.images[0]) {
      return res.status(200).json({ 
        success: true,
        imageData: response.data.images[0]
      });
    } else {
      throw new Error('No image data received');
    }
  } catch (error) {
    console.error('Image generation error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Resim oluşturma hatası'
    });
  }
}
