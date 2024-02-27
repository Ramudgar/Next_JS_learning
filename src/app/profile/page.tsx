"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React,{ useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] =useState("Nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      toast.success(response.data.message);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Profile</h1>
      <hr /> <br />
      <p>Profile Page</p>
      <h2 className="p-1 bg-orange-500 m-2 ">{data==="nothing"?'Nothing': <Link  href={`/profile/${data}`}>
        {data}
        </Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-red-400 hover:bg-red-700 px-4 rounded text-white font-bold py-2"
      >
        Logout
      </button>
      <hr />
      <button
        onClick={getUserData}
        className="bg-green-500 mt-2 hover:bg-red-700 px-4 rounded text-white font-bold py-2"
      >
        getUserData
      </button>
    </div>
  );
}
