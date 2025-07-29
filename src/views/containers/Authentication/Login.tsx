import React, { useState } from "react";
import { MdPerson, MdLock } from "react-icons/md"; // ✅ MdPerson for username
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/authContext";
import * as Component from "../../components";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState(""); // ✅ Changed from email to username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Pass username instead of email
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Component.AuthLayout
      title="Sign In to your Account"
      rightContent={
        <div className="text-white text-center">
          <h1 className="text-5xl font-extrabold font-montserrat tracking-tighter leading-tight mb-4">
            School of Computer Studies
          </h1>
          <p className="text-3xl font-medium italic text-white/85">
            Academic Advising
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="w-[320px] flex flex-col items-center">
        {error && (
          <div className="mb-4 w-full p-2 bg-red-100 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}
        {/* ✅ Username Input */}
        <Component.TextInput
          icon={<MdPerson />}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        {/* ✅ Password Input */}
        <Component.TextInput
          icon={<MdLock />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="bg-[#016630] hover:bg-[#045F2E] hover:text-gray-200 cursor-pointer text-white font-bold py-2 rounded-md mb-6 transition-colors text-base shadow-md w-[140px]"
          disabled={loading}
        >
          {loading ? "LOADING..." : "SIGN IN"}
        </button>
        <p className="text-gray-500 text-sm w-full text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-[#016630] font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </Component.AuthLayout>
  );
};

export default Login;
