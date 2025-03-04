import React, { Component, ErrorInfo } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
}

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const DefaultFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
    <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
    <h2 className="text-2xl font-bold mb-2">Bir şeyler yanlış gitti</h2>
    <p className="text-gray-600 mb-4">
      Üzgünüz, bir hata oluştu. Lütfen daha sonra tekrar deneyin.
    </p>
    <div className="text-left bg-gray-100 p-4 rounded-md mb-4 max-w-full overflow-auto">
      <pre className="text-sm text-red-600 whitespace-pre-wrap break-words">
        {error.message}
      </pre>
    </div>
    <Button onClick={resetErrorBoundary}>Tekrar Dene</Button>
  </div>
);

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback: Fallback = DefaultFallback } = this.props;

    if (hasError && error) {
      return <Fallback error={error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return children;
  }
}
