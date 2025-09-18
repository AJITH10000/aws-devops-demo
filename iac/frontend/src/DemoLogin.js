import React, { useState } from "react";

const DemoLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const demoEmail = "hire-me@anshumat.org";
    const demoPassword = "HireMe@2025!";

    if (email === demoEmail && password === demoPassword) {
      alert("Demo login successful!");
      onLogin(); // trigger dashboard view
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Demo Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "5px", width: "90%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "5px", width: "90%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default DemoLogin;
