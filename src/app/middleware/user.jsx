"use client";
// components/AdminRouteProtection.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../config/supabase.js";

const UserAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [getLogins, setGetLogin] = useState(null);
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {
    async function getLogin() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setLoading(false)
            console.log("Awikwok")
          router.push("/login");
        }
        setGetLogin(user?.email);
        console.log(user);
        console.log("TESTESTSET");
      } catch (error) {
          setLoading(false)
          console.error(error.message);
        router.push("/login");
      }
    }
    getLogin();
  }, [getLogins]);

  return <>{children}</>;
};

export default UserAuth;
