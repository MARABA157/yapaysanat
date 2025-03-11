import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Play, Pause, Scissors, Wand2, RotateCcw, Download, Share2, Volume2, VolumeX, Music } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/toaster';
import { Progress } from '@/components/ui/progress';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// FFmpeg yükleme durumu
const ffmpeg = createFFmpeg({ 
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.js'
});

// Özel stil tanımı
const pageStyle: React.CSSProperties = {
  backgroundImage: 'url(/images/jakob-owens-CiUR8zISX60-unsplash.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative',
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: -1,
};

export default function VideoEditor() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoFilters, setVideoFilters] = useState<string>('');
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(100);
  const [duration, setDuration] = useState<number>(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const [videoName, setVideoName] = useState<string>('');
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [ffmpegLoading, setFfmpegLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoFileRef = useRef<File | null>(null);

  // FFmpeg'i yükle
  const loadFFmpeg = async () => {
    if (!ffmpeg.isLoaded()) {
      setFfmpegLoading(true);
      try {
        await ffmpeg.load();
        setFfmpegLoaded(true);
        toast.success('Video işleme motoru yüklendi');
      } catch (error) {
        console.error('FFmpeg yüklenemedi:', error);
        toast.error('Video işleme motoru yüklenemedi');
      } finally {
        setFfmpegLoading(false);
      }
    } else {
      setFfmpegLoaded(true);
    }
  };

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedVideo(url);
      setVideoName(file.name);
      videoFileRef.current = file;
      resetFilters();
      setIsProcessed(false);
    }
  };

  const resetFilters = () => {
    setVideoFilters('');
    setPlaybackRate(1);
    setStartTime(0);
    if (videoRef.current) {
      videoRef.current.style.filter = '';
      videoRef.current.playbackRate = 1;
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (videoRef.current && selectedVideo) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
          setEndTime(videoRef.current.duration);
        }
      };
    }
  }, [selectedVideo]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const applyBlur = () => {
    setIsProcessing(true);
    toast({
      title: "Bulanıklaştırma uygulanıyor",
      description: "Video bulanıklaştırılıyor...",
    });

    setTimeout(() => {
      if (videoRef.current) {
        const newFilter = 'blur(5px)';
        videoRef.current.style.filter = newFilter;
        setVideoFilters(newFilter);
      }

      setIsProcessing(false);
      toast({
        title: "İşlem tamamlandı",
        description: "Bulanıklaştırma efekti uygulandı.",
      });
    }, 500);
  };

  const applyBrightness = () => {
    setIsProcessing(true);
    toast({
      title: "Parlaklık ayarlanıyor",
      description: "Video parlaklığı artırılıyor...",
    });

    setTimeout(() => {
      if (videoRef.current) {
        const newFilter = 'brightness(1.5)';
        videoRef.current.style.filter = newFilter;
        setVideoFilters(newFilter);
      }

      setIsProcessing(false);
      toast({
        title: "İşlem tamamlandı",
        description: "Parlaklık efekti uygulandı.",
      });
    }, 500);
  };

  const applyContrast = () => {
    setIsProcessing(true);
    toast({
      title: "Kontrast ayarlanıyor",
      description: "Video kontrastı artırılıyor...",
    });

    setTimeout(() => {
      if (videoRef.current) {
        const newFilter = 'contrast(1.5)';
        videoRef.current.style.filter = newFilter;
        setVideoFilters(newFilter);
      }

      setIsProcessing(false);
      toast({
        title: "İşlem tamamlandı",
        description: "Kontrast efekti uygulandı.",
      });
    }, 500);
  };

  const applyGrayscale = () => {
    setIsProcessing(true);
    toast({
      title: "Siyah-beyaz efekti uygulanıyor",
      description: "Video siyah-beyaz yapılıyor...",
    });

    setTimeout(() => {
      if (videoRef.current) {
        const newFilter = 'grayscale(1)';
        videoRef.current.style.filter = newFilter;
        setVideoFilters(newFilter);
      }

      setIsProcessing(false);
      toast({
        title: "İşlem tamamlandı",
        description: "Siyah-beyaz efekti uygulandı.",
      });
    }, 500);
  };

  const applySpeedChange = (speed: number) => {
    setIsProcessing(true);
    toast({
      title: "Hız değiştiriliyor",
      description: `Video hızı ${speed}x yapılıyor...`,
    });

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = speed;
        setPlaybackRate(speed);
      }

      setIsProcessing(false);
      toast({
        title: "İşlem tamamlandı",
        description: `Video hızı ${speed}x olarak ayarlandı.`,
      });
    }, 500);
  };

  const trimVideo = () => {
    setIsProcessing(true);
    toast({
      title: "Video kırpılıyor",
      description: "Belirlenen aralık kırpılıyor...",
    });

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = startTime;
      }

      setIsProcessing(false);
      toast({
        title: "İşlem tamamlandı",
        description: `Video ${startTime.toFixed(1)} - ${endTime.toFixed(1)} saniye aralığına kırpıldı.`,
      });
    }, 500);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const processVideo = async () => {
    if (!selectedVideo || !videoFileRef.current || !ffmpegLoaded) {
      toast.error('Video işlenemedi. Lütfen bir video yükleyin ve tekrar deneyin.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    toast.info('Video işleniyor, lütfen bekleyin...');

    try {
      // Video dosyasını FFmpeg'e yükle
      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFileRef.current));

      // Filtre komutlarını oluştur
      let filterCommands = [];
      let outputOptions = ['-c:a copy']; // Ses kanalını kopyala

      // Hız değişikliği
      if (playbackRate !== 1) {
        filterCommands.push(`setpts=${1/playbackRate}*PTS`);
        outputOptions.push(`-filter:a "atempo=${playbackRate}"`);
      }

      // Görsel filtreler
      if (videoFilters.includes('blur')) {
        filterCommands.push('boxblur=5:1');
      }
      if (videoFilters.includes('brightness')) {
        filterCommands.push('eq=brightness=0.3');
      }
      if (videoFilters.includes('contrast')) {
        filterCommands.push('eq=contrast=1.5');
      }
      if (videoFilters.includes('grayscale')) {
        filterCommands.push('hue=s=0');
      }

      // Filtreleri birleştir
      let filterComplex = filterCommands.length > 0 ? `-vf "${filterCommands.join(',')}"` : '';
      
      // Kırpma işlemi
      const trimCommand = `-ss ${startTime} -to ${endTime}`;

      // İlerleme durumunu izle
      ffmpeg.setProgress(({ ratio }) => {
        setProgress(Math.round(ratio * 100));
      });

      // FFmpeg komutunu çalıştır
      await ffmpeg.run(
        '-i', 'input.mp4',
        ...trimCommand.split(' '),
        ...filterComplex.split(' ').filter(Boolean),
        ...outputOptions.join(' ').split(' ').filter(Boolean),
        'output.mp4'
      );

      // İşlenmiş videoyu al
      const data = ffmpeg.FS('readFile', 'output.mp4');
      
      // Blob oluştur ve URL'ye dönüştür
      const blob = new Blob([data.buffer], { type: 'video/mp4' });
      const processedVideoUrl = URL.createObjectURL(blob);
      
      // Eski URL'yi temizle ve yeni URL'yi ayarla
      if (selectedVideo) {
        URL.revokeObjectURL(selectedVideo);
      }
      
      setSelectedVideo(processedVideoUrl);
      setIsProcessed(true);
      toast.success('Video başarıyla işlendi!');
    } catch (error) {
      console.error('Video işleme hatası:', error);
      toast.error('Video işlenirken bir hata oluştu.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadVideo = () => {
    if (!selectedVideo) return;

    const a = document.createElement('a');
    a.href = selectedVideo;
    a.download = `edited_${videoName || 'video.mp4'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.success('Video indiriliyor...');
  };

  const shareVideo = () => {
    if (navigator.share) {
      navigator.share({
        title: 'İşlenen Video',
        text: 'Yapay Sanat Galerisi ile düzenlediğim video',
        url: window.location.href,
      })
      .then(() => {
        toast.success('Video bağlantısı paylaşıldı.');
      })
      .catch((error) => {
        toast.error('Video paylaşılırken bir hata oluştu.');
      });
    } else {
      toast.error('Tarayıcınız paylaşım özelliğini desteklemiyor.');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      <div className="container mx-auto py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-white">Video Düzenleyici</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Önizleme */}
          <div className="lg:col-span-2">
            <Card className="p-4 bg-black/50 backdrop-blur-sm border-gray-700">
              <div 
                ref={videoContainerRef}
                className="aspect-video bg-gray-900 rounded-lg overflow-hidden"
              >
                {selectedVideo ? (
                  <video 
                    ref={videoRef}
                    src={selectedVideo} 
                    className="w-full h-full object-contain"
                    controls
                    onTimeUpdate={() => {
                      if (videoRef.current && videoRef.current.currentTime >= endTime) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = startTime;
                        setIsPlaying(false);
                      }
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <label className="cursor-pointer text-center">
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 mb-2 text-gray-400" />
                        <p className="text-gray-300">Video yüklemek için tıklayın</p>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {selectedVideo && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Button onClick={togglePlay} disabled={isProcessing}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? 'Duraklat' : 'Oynat'}
                  </Button>
                  <Button variant="outline" onClick={resetFilters} disabled={isProcessing}>
                    <RotateCcw size={16} className="mr-2" />
                    Sıfırla
                  </Button>

                  <Button variant="outline" onClick={toggleMute} disabled={isProcessing}>
                    {isMuted ? <VolumeX size={16} className="mr-2" /> : <Volume2 size={16} className="mr-2" />}
                    {isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                  </Button>

                  {isProcessed && (
                    <>
                      <Button variant="outline" onClick={downloadVideo} disabled={isProcessing}>
                        <Download size={16} className="mr-2" />
                        İndir
                      </Button>
                      <Button variant="outline" onClick={shareVideo} disabled={isProcessing}>
                        <Share2 size={16} className="mr-2" />
                        Paylaş
                      </Button>
                    </>
                  )}
                </div>
              )}

              {isProcessing && (
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">İşleniyor: %{progress}</p>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </Card>
          </div>

          {/* Düzenleme Araçları */}
          <div>
            <Card className="p-4 bg-black/50 backdrop-blur-sm border-gray-700">
              <Tabs defaultValue="effects">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="effects">Efektler</TabsTrigger>
                  <TabsTrigger value="speed">Hız</TabsTrigger>
                  <TabsTrigger value="trim">Kırpma</TabsTrigger>
                  <TabsTrigger value="audio">Ses</TabsTrigger>
                </TabsList>

                <TabsContent value="effects">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      disabled={!selectedVideo || isProcessing}
                      onClick={applyBlur}
                    >
                      Bulanıklaştır
                    </Button>
                    <Button 
                      variant="outline" 
                      disabled={!selectedVideo || isProcessing}
                      onClick={applyBrightness}
                    >
                      Parlaklık
                    </Button>
                    <Button 
                      variant="outline" 
                      disabled={!selectedVideo || isProcessing}
                      onClick={applyContrast}
                    >
                      Kontrast
                    </Button>
                    <Button 
                      variant="outline" 
                      disabled={!selectedVideo || isProcessing}
                      onClick={applyGrayscale}
                    >
                      Siyah-Beyaz
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="speed">
                  <div className="space-y-4">
                    <p className="mb-2 text-gray-200">Oynatma Hızı: {playbackRate}x</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        disabled={!selectedVideo || isProcessing}
                        onClick={() => applySpeedChange(0.5)}
                      >
                        0.5x
                      </Button>
                      <Button 
                        variant="outline" 
                        disabled={!selectedVideo || isProcessing}
                        onClick={() => applySpeedChange(1)}
                      >
                        1x
                      </Button>
                      <Button 
                        variant="outline" 
                        disabled={!selectedVideo || isProcessing}
                        onClick={() => applySpeedChange(1.5)}
                      >
                        1.5x
                      </Button>
                      <Button 
                        variant="outline" 
                        disabled={!selectedVideo || isProcessing}
                        onClick={() => applySpeedChange(2)}
                      >
                        2x
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trim">
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-gray-200">Başlangıç: {startTime.toFixed(1)} sn</p>
                      <Slider 
                        disabled={!selectedVideo || isProcessing} 
                        value={[startTime]} 
                        max={duration} 
                        step={0.1}
                        onValueChange={(value) => {
                          if (value[0] < endTime) {
                            setStartTime(value[0]);
                            if (videoRef.current) {
                              videoRef.current.currentTime = value[0];
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-gray-200">Bitiş: {endTime.toFixed(1)} sn</p>
                      <Slider 
                        disabled={!selectedVideo || isProcessing} 
                        value={[endTime]} 
                        max={duration} 
                        step={0.1}
                        onValueChange={(value) => {
                          if (value[0] > startTime) {
                            setEndTime(value[0]);
                          }
                        }}
                      />
                    </div>
                    <Button 
                      disabled={!selectedVideo || isProcessing} 
                      className="w-full"
                      onClick={trimVideo}
                    >
                      <Scissors className="mr-2 h-4 w-4" />
                      Kırp
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="audio">
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-gray-200">Ses Seviyesi: {Math.round(volume * 100)}%</p>
                      <Slider 
                        disabled={!selectedVideo || isProcessing} 
                        value={[volume]} 
                        max={1} 
                        step={0.01}
                        onValueChange={(value) => handleVolumeChange(value[0])}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={!selectedVideo || isProcessing}
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                      {isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4">
                <Button 
                  className="w-full" 
                  disabled={!selectedVideo || isProcessing || !ffmpegLoaded}
                  onClick={processVideo}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Videoyu İşle
                    </>
                  )}
                </Button>
                {ffmpegLoading && (
                  <p className="text-xs text-gray-400 mt-2 text-center">Video işleme motoru yükleniyor...</p>
                )}
              </div>
            </Card>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
}
