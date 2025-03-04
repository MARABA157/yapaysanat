import { toast } from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
}

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'loading' | 'custom' = 'custom', options?: ToastOptions) => {
    switch (type) {
      case 'success':
        return toast.success(message, options);
      case 'error':
        return toast.error(message, options);
      case 'loading':
        return toast.loading(message, options);
      default:
        return toast(message, options);
    }
  };

  return {
    showToast,
    dismiss: toast.dismiss,
    toast: (options: ToastOptions) => {
      const { title, description, variant = 'default', ...rest } = options;
      const message = title ? `${title}\n${description || ''}` : description;
      return showToast(message || '', variant === 'destructive' ? 'error' : 'custom', rest);
    },
  };
};

export default useToast;
