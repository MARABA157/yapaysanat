import { toast } from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
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
  };
};

export default useToast;
