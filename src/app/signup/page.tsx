"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.username && user.password && user.email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup response", response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>{loading ? "processing" : "signup"}</h1>
      <hr className="" />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 text-black border border-gray-300 rounded mb-2 mt-2 foucs:outline-none foucs:ring-2 foucs:ring-blue-600"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        id="username"
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 text-black border border-gray-300 rounded mb-2 mt-2 foucs:outline-none foucs:ring-2 foucs:ring-blue-600"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        id="email"
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 text-black border border-gray-300 rounded mb-2 mt-2 foucs:outline-none foucs:ring-2 foucs:ring-blue-600"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        id="password"
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className=" p-2 rounded-lg border border-grey-300 focus:outline-none focus:border-grey-600"
      >
        {buttonDisabled ? "Disabled" : "Signup"}
      </button>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}
