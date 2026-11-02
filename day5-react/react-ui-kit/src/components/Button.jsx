
import React from "react";

function Button({ children, variant = "primary", loading = false, onClick }) {
  const styles = {
    primary: { backgroundColor: "blue", color: "white" },
    secondary: { backgroundColor: "gray", color: "white" },
    danger: { backgroundColor: "red", color: "white" },
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        ...styles[variant],
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
