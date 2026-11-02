
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Remember the element that had focus before opening
    const previousFocus = document.activeElement;

    // Move focus inside the modal
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      "button, input, textarea, select, a[href], [tabindex]:not([tabindex='-1'])"
    );

    focusableElements[0]?.focus();

    function handleKeyDown(event) {
      // Close modal using Escape
      if (event.key === "Escape") {
        onClose();
      }

      // Trap keyboard focus inside the modal
      if (event.key === "Tab") {
        const elements = modal.querySelectorAll(
          "button, input, textarea, select, a[href], [tabindex]:not([tabindex='-1'])"
        );

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Example modal"
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          minWidth: "300px"
        }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
