"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";

export default function Statistik() {
  const [user, setUser] = useState(null);
  const [absensi, setAbsensi] = useState([]);

  useEffect(() => {
    async function fetchData() {    
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) console.error("Error fetching user data:", userError);
      else setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email);
      if (profileError)
        console.error("Error fetching profile data:", profileError);
      else {
        const guruId = profileData[0]?.id;
        if (guruId) {   
          const { data: absensiData, error: absensiError } = await supabase
            .from("absensi")
            .select("*")
            .eq("id_guru", guruId);
          if (absensiError)
            console.error("Error fetching absensi data:", absensiError);
          else setAbsensi(absensiData);
        }
      }
    }

    fetchData();
  }, [user]); 
  return (
    <>

      <div className="stats shadow m-5">
  {absensi.map((absen, index) => (
    <div className="stat" key={index}>
      <div className="stat-figure text-secondary"></div>
      <div className="stat-title">Jam Masuk</div>
      <div className="stat-value text-xl">{absen.check_in}</div>
      
      <div className="stat-figure text-secondary"></div>
      <div className="stat-title">Jam Keluar</div>
      <div className="stat-value text-xl">{absen.check_out}</div>
      
      <div className="stat-figure text-secondary"></div>
      <div className="stat-desc">Monday, January 10, 2024</div>
    </div>
  ))}
</div>

    </>
  );
}
