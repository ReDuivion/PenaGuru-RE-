"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase.js";
export default function page() {
  const [email, setEmail] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState(false);

  const init = async (e) => {
    e.prevent.default;

    if (email.password !== email.password) {
      alert("Passwords do not match");
      setData(false);
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.email,
        password: email.password,
      });

      if (error) {
        console.error(error);
        setData(false);
      } else {
        console.log("HELLO")
      }
    } catch (error) {
      console.error("GAGAL", error.message);
    } finally {
      setData(false);
    }
  };

  return (
    <>
      <form onSubmit={init}>
        <div>
          <h1>Email</h1>
          <input
            value={email.email}
            type="text"
            name="email"
            id="email"
            onChange={(e) =>
              setEmail({
                ...email,
                email: e.target.value,
              })
            }
          />
          <input
            value={email.password}
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setEmail({
                ...email,
                password: e.target.value,
              })
            }
          />

          <button type="submit">TEST</button>
        </div>
      </form>
    </>
  );
}
