"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const page = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully!");
      window.location.href = "/dashboard"; 
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={login}>
        <h2>Create an account</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
          placeholder="Enter your email"
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default page;
