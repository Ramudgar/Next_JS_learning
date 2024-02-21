"use client";
import Link from "next/link";
import React, {  useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login response",response.data);
      toast.success("Login successful");
      router.push("/profile");

    }
    catch(error:any){
      console.log("login failed",error.message);
      toast.error(error.message);

    }
    finally{
      setLoading(false);
    } 

  };

  useEffect(() => {
    if (user.password && user.email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }
  , [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>{loading?"processing":"Login"}</h1>
      <hr className="" />
      
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
        onClick={onLogin}
      className=" p-2 rounded-lg border border-grey-300 focus:outline-none focus:border-grey-600">
      {buttonDisabled ? "disabled" : "Login"}
      </button>
        <Link href="/signup">
             Don &apos; t have an account? Signup
        </Link>
    </div>
  );
}
