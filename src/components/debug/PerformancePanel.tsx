import React, { useEffect, useState } from 'react';
import imagePerformanceMonitor from '@/lib/image-performance';
import networkMonitor from '@/lib/network-monitor';

interface PerformanceStats {
  network: {
    totalRequests: number;
    failedRequests: number;
    slowRequests: number;
  };
  images: {
    totalImages: number;
    successfulLoads: number;
    failedLoads: number;
    avgLoadTime: number;
    problematicImages: string[];
  };
}

const PerformancePanel: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    network: {
      totalRequests: 0,
      failedRequests: 0,
      slowRequests: 0
    },
    images: {
      totalImages: 0,
      successfulLoads: 0,
      failedLoads: 0,
      avgLoadTime: 0,
      problematicImages: []
    }
  });
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'network' | 'images'>('network');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Performans izleme modüllerini etkinleştir
    networkMonitor.enable();
    imagePerformanceMonitor.enable();

    // İstatistikleri periyodik olarak güncelle
    const intervalId = setInterval(() => {
      const networkStats = networkMonitor.getStats();
      const imageStats = imagePerformanceMonitor.getStats();

      setStats({
        network: {
          totalRequests: networkStats.totalRequests,
          failedRequests: networkStats.failedRequests,
          slowRequests: networkStats.slowRequests
        },
        images: {
          totalImages: imageStats.totalImages,
          successfulLoads: imageStats.successfulLoads,
          failedLoads: imageStats.failedLoads,
          avgLoadTime: imageStats.avgLoadTime,
          problematicImages: imageStats.problematicImages || []
        }
      });

      // Önerileri güncelle
      updateRecommendations(networkStats, imageStats);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Performans sorunlarına göre öneriler oluştur
  const updateRecommendations = (networkStats: any, imageStats: any) => {
    const newRecommendations: string[] = [];

    // Ağ sorunları için öneriler
    if (networkStats.failedRequests > 0) {
      newRecommendations.push('Bazı ağ istekleri başarısız oldu. Sunucu bağlantınızı kontrol edin.');
    }

    if (networkStats.slowRequests > 2) {
      newRecommendations.push('Yavaş ağ istekleri tespit edildi. CDN kullanmayı veya içeriği optimize etmeyi düşünün.');
    }

    // Resim sorunları için öneriler
    if (imageStats.failedLoads > 0) {
      newRecommendations.push('Bazı resimler yüklenemedi. Dosya yollarını ve erişim izinlerini kontrol edin.');
    }

    if (imageStats.avgLoadTime > 1000) {
      newRecommendations.push('Resim yükleme süreleri yüksek. Resimleri sıkıştırmayı ve WebP formatını kullanmayı deneyin.');
    }

    if (imageStats.problematicImages && imageStats.problematicImages.length > 0) {
      newRecommendations.push('Tekrarlayan sorunlar yaşanan resimler tespit edildi. Bu resimleri optimize edin veya değiştirin.');
    }

    setRecommendations(newRecommendations);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performans Analizi</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Sekmeler */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            <button
              className={`py-2 px-4 ${activeTab === 'network' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('network')}
            >
              Ağ İstekleri
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'images' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('images')}
            >
              Resim Performansı
            </button>
          </div>

          {/* Ağ İstekleri Sekmesi */}
          {activeTab === 'network' && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className="text-xl font-bold">{stats.network.totalRequests}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Toplam İstek</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className={`text-xl font-bold ${stats.network.failedRequests > 0 ? 'text-red-500' : ''}`}>
                    {stats.network.failedRequests}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Başarısız</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className={`text-xl font-bold ${stats.network.slowRequests > 0 ? 'text-yellow-500' : ''}`}>
                    {stats.network.slowRequests}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Yavaş</div>
                </div>
              </div>

              <button
                onClick={() => networkMonitor.logStats()}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mb-4"
              >
                Detaylı Ağ Analizi
              </button>
            </div>
          )}

          {/* Resim Performansı Sekmesi */}
          {activeTab === 'images' && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className="text-xl font-bold">{stats.images.totalImages}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Toplam Resim</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className={`text-xl font-bold ${stats.images.failedLoads > 0 ? 'text-red-500' : ''}`}>
                    {stats.images.failedLoads}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Başarısız</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className="text-xl font-bold">{stats.images.successfulLoads}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Başarılı</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <div className={`text-xl font-bold ${stats.images.avgLoadTime > 1000 ? 'text-yellow-500' : ''}`}>
                    {stats.images.avgLoadTime}ms
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Ort. Süre</div>
                </div>
              </div>

              {stats.images.problematicImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-500 mb-2">Sorunlu Resimler</h4>
                  <div className="max-h-32 overflow-y-auto text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    {stats.images.problematicImages.map((img, index) => (
                      <div key={index} className="mb-1 truncate text-gray-700 dark:text-gray-300">
                        {index + 1}. {img.split('/').pop()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => imagePerformanceMonitor.logStats()}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mb-4"
              >
                Detaylı Resim Analizi
              </button>
            </div>
          )}

          {/* Öneriler */}
          {recommendations.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Öneriler</h4>
              <ul className="text-sm space-y-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 dark:text-gray-200">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PerformancePanel;
