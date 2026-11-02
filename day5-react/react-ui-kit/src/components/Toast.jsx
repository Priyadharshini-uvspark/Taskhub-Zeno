
import { useEffect } from "react";

function Toast({ toasts, removeToast }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div
      role="status"
      style={{
        background: "green",
        color: "white",
        padding: "12px 20px",
        borderRadius: "5px"
      }}
    >
      {toast.message}
      <button
        onClick={() => removeToast(toast.id)}
        style={{ marginLeft: "15px" }}
      >
        X
      </button>
    </div>
  );
}

export default Toast;
