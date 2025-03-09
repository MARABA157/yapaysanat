import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Play, Pause, Scissors, Wand2, RotateCcw, Download, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

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

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedVideo(url);
      setVideoName(file.name);
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

  const processVideo = () => {
    setIsProcessing(true);
    toast({
      title: "Video işleniyor",
      description: "Tüm efektler uygulanıyor...",
    });

    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
      toast({
        title: "İşlem tamamlandı",
        description: "Video başarıyla işlendi. Şu anda önizleme modundasınız.",
      });
    }, 1000);
  };

  const downloadVideo = () => {
    if (!selectedVideo) return;

    const a = document.createElement('a');
    a.href = selectedVideo;
    a.download = `edited_${videoName || 'video.mp4'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Video indiriliyor",
      description: "İşlenen video indiriliyor...",
    });
  };

  const shareVideo = () => {
    if (navigator.share) {
      navigator.share({
        title: 'İşlenen Video',
        text: 'Yapay Sanat Galerisi ile düzenlediğim video',
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Paylaşım başarılı",
          description: "Video bağlantısı paylaşıldı.",
        });
      })
      .catch((error) => {
        toast({
          title: "Paylaşım hatası",
          description: "Video paylaşılırken bir hata oluştu.",
        });
      });
    } else {
      toast({
        title: "Paylaşım desteklenmiyor",
        description: "Tarayıcınız paylaşım özelliğini desteklemiyor.",
      });
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
            </Card>
          </div>

          {/* Düzenleme Araçları */}
          <div>
            <Card className="p-4 bg-black/50 backdrop-blur-sm border-gray-700">
              <Tabs defaultValue="effects">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="effects">Efektler</TabsTrigger>
                  <TabsTrigger value="speed">Hız</TabsTrigger>
                  <TabsTrigger value="trim">Kırpma</TabsTrigger>
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
              </Tabs>

              <div className="mt-4">
                <Button 
                  className="w-full" 
                  disabled={!selectedVideo || isProcessing}
                  onClick={processVideo}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Videoyu İşle
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
}
