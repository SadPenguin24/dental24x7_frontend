import { useToast } from "./use-toast";

export default function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 flex w-full flex-col items-end gap-2 p-4 md:max-w-[420px]">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`w-full rounded-lg border p-4 shadow-md ${
            toast.variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border bg-background text-foreground"
          }`}
        >
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && (
            <div className="text-sm">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
