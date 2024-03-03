"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const response = await axios.post("/api/users/verifyemail", {
          token,
        });
        console.log(response.data);
        setVerified(true);
      } catch (error:any) {
        setError(true);
        console.log(error.response.data);
      }
    };

    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-400 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h1>Your email has been verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && <h1>There was an error verifying your email</h1>}
    </div>
  );
}
