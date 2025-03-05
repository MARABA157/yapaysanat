import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl text-gray-400 mb-8">
          {error.message || 'Bir şeyler yanlış gitti'}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:opacity-90 transition-opacity"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
