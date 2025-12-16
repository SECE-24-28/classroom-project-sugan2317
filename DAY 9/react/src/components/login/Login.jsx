import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");

    if (!user.trim() || !password.trim()) {
      setErr("Please fill all fields");
      return;
    }

    if (user.trim() === "admin" && password.trim() === "1234") {
      setLogged(true);
    } else {
      setErr("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setLogged(false);
    setUser("");
    setPassword("");
  };

  return (
    <div className="p-6 flex-col gap-4 w-full max-w-md mx-auto mt-10 bg-slate-50 rounded-lg shadow-lg">
      {!logged ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setErr("");
            }}
          />

          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr("");
            }}
          />

          {err && <p className="text-red-500">{err}</p>}

          <button
            className="bg-blue-600 text-white p-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user}!</h2>
          <button
            className="bg-red-600 text-white p-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
