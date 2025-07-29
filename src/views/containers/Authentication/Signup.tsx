import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router";
import * as Component from "../../components";
import { useAuth } from "../../../contexts/authContext"; // ✅ useAuth
import * as AuthService from "../../../services/authService"; // ✅ signup API

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ we'll use this to auto-login

  const [formData, setFormData] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Register the user
      await AuthService.signup({
        username: formData.username,
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
      });

      // 2️⃣ Immediately login using AuthContext
      await login(formData.username, formData.password); // ✅ login with typed username

      // 3️⃣ Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Component.AuthLayout
      title="Create Account"
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
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md w-full text-sm">
            {error}
          </div>
        )}

        <div className="w-full flex gap-3">
          <Component.TextInput
            icon={<FaUser />}
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <Component.TextInput
            icon={<FaUser />}
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>

        <Component.TextInput
          icon={<FaUser />}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />


        <Component.TextInput
          icon={<MdEmail />}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Component.TextInput
          icon={<MdLock />}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create Password"
          required
          minLength={6}
        />
        <Component.TextInput
          icon={<MdLock />}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />

        <button
          type="submit"
          className="bg-[#016630] hover:bg-[#045F2E] hover:text-gray-200 cursor-pointer text-white font-bold py-2 rounded-md mb-6 transition-colors text-base shadow-md w-[140px]"
          disabled={loading}
        >
          {loading ? "LOADING..." : "SIGN UP"}
        </button>

        <p className="text-gray-500 text-sm w-full text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="text-[#016630] font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </p>
      </form>
    </Component.AuthLayout>
  );
};

export default Signup;
