import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const { register, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#2D3748",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
