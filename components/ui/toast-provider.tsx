"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ToastType = "cart" | "wishlist" | "error" | "success";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  emoji?: string;
}

type ToastContextValue = {
  showToast: (message: string, type: ToastType, emoji?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastType, string> = {
  cart: "border-[#FFB800] shadow-[5px_5px_0_#FFB800]",
  wishlist: "border-[#E11D48] shadow-[5px_5px_0_#E11D48]",
  success: "border-[#25D366] shadow-[5px_5px_0_#25D366]",
  error: "border-[#E11D48] shadow-[5px_5px_0_#E11D48]",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType, emoji?: string) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => {
        const next = [...prev, { id, message, type, emoji }];
        return next.length > 3 ? next.slice(-3) : next;
      });
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-3 md:left-auto md:right-4 md:translate-x-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 2500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`flex items-center gap-3 rounded-bl-[20px] rounded-tr-[20px] border-2 bg-[#111] px-5 py-4 font-black text-white ${toastStyles[toast.type]}`}
    >
      {toast.emoji && <span className="text-lg">{toast.emoji}</span>}
      <span className="text-sm">{toast.message}</span>
    </motion.div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}