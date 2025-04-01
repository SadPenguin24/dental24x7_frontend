// Simplified version of the toast hook
import { useState } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props]);

    // In a real implementation, we would handle removing toasts after a timeout
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 3000);
  };

  return {
    toast,
    toasts,
  };
}
