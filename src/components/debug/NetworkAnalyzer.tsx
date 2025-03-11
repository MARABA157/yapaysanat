import React, { useEffect, useState } from 'react';
import networkMonitor from '@/lib/network-monitor';

interface NetworkStats {
  totalRequests: number;
  failedRequests: number;
  slowRequests: number;
  details: {
    failed: any[];
    slow: any[];
  };
}

const NetworkAnalyzer: React.FC = () => {
  const [stats, setStats] = useState<NetworkStats>({
    totalRequests: 0,
    failedRequests: 0,
    slowRequests: 0,
    details: {
      failed: [],
      slow: []
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // İstatistikleri güncelleyen dinleyici
    const updateStats = (newStats: NetworkStats) => {
      setStats(newStats);
    };

    // Dinleyiciyi ekle
    networkMonitor.addListener(updateStats);

    // Component unmount olduğunda dinleyiciyi kaldır
    return () => {
      networkMonitor.removeListener(updateStats);
    };
  }, []);

  // Network monitor'ü etkinleştir/devre dışı bırak
  const toggleMonitor = () => {
    if (isEnabled) {
      networkMonitor.disable();
      setIsEnabled(false);
    } else {
      networkMonitor.enable();
      setIsEnabled(true);
    }
  };

  // İstatistikleri konsola yazdır
  const logStats = () => {
    networkMonitor.logStats();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Açılır panel düğmesi */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* Açılır panel */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 mt-2 w-80 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ağ Analizi</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Kontrol düğmeleri */}
            <div className="flex space-x-2">
              <button
                onClick={toggleMonitor}
                className={`px-3 py-1 rounded text-white ${isEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {isEnabled ? 'Devre Dışı Bırak' : 'Etkinleştir'}
              </button>
              <button
                onClick={logStats}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Konsola Yazdır
              </button>
            </div>

            {/* İstatistikler */}
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold">{stats.totalRequests}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Toplam İstek</div>
                </div>
                <div>
                  <div className={`text-xl font-bold ${stats.failedRequests > 0 ? 'text-red-500' : ''}`}>
                    {stats.failedRequests}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Başarısız</div>
                </div>
                <div>
                  <div className={`text-xl font-bold ${stats.slowRequests > 0 ? 'text-yellow-500' : ''}`}>
                    {stats.slowRequests}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Yavaş</div>
                </div>
              </div>
            </div>

            {/* Başarısız istekler */}
            {stats.failedRequests > 0 && (
              <div>
                <h4 className="font-medium text-red-500 mb-1">Başarısız İstekler</h4>
                <div className="max-h-32 overflow-y-auto text-xs">
                  {stats.details.failed.map((req, index) => (
                    <div key={index} className="mb-1 p-1 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="truncate">{req.url}</div>
                      <div className="text-red-600 dark:text-red-400">{req.error}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yavaş istekler */}
            {stats.slowRequests > 0 && (
              <div>
                <h4 className="font-medium text-yellow-500 mb-1">Yavaş İstekler</h4>
                <div className="max-h-32 overflow-y-auto text-xs">
                  {stats.details.slow.map((req, index) => (
                    <div key={index} className="mb-1 p-1 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <div className="truncate">{req.url}</div>
                      <div className="text-yellow-600 dark:text-yellow-400">
                        {req.endTime && req.startTime ? `${Math.round(req.endTime - req.startTime)}ms` : 'Süre bilinmiyor'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkAnalyzer;
