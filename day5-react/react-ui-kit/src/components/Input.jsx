
function Input({ label, error, value, onChange, placeholder }) {
  return (
    <div style={{ margin: "15px 5px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: "10px",
          border: error ? "1px solid red" : "1px solid gray",
          borderRadius: "5px",
          width: "250px"
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: "13px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
