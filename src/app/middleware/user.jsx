"use client";
// components/AdminRouteProtection.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../config/supabase.js";

const GuruAuth = ({ children }) => {
  const router = useRouter();
const [userEmail,setUserEmail] =useState(null)
  useEffect(() => {
    const checkAdminAccess = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          setUserEmail(user.email);
if(!user){
    router.push("/login")
}else{
    console.log("sudah ada akun ")
}
    checkAdminAccess();
  }
  catch (error) {
    console.error("Error checking user", error.message);
    setIsAdmin(false);
    router.push("/");
  }
}
}, [router]);

  return <>{children}</>;
};

export default GuruAuth;
