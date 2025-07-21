"use client";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const page = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={signup}>
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default page;
