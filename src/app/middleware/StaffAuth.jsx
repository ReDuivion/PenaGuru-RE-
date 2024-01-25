'use client'
// components/AdminRouteProtection.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../config/supabase.js";

const AdminRouteProtection = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { user } = await supabase.auth.user();
        const { data: adminData, error: adminError } = await supabase
          .from("staffs")
          .select("*")
          .eq("email", user.email)
          .single();

        if (adminError || !adminData) {
          console.error("Error checking admin access:", adminError);
          router.push("/unauthorized");
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        router.push("/");
      }
    };

    checkAdminAccess();
  }, [router]);

  return <>{children}</>;
};

export default AdminRouteProtection;
