"use client";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase.js";
import moment from "moment-timezone";
import Carousels from "./components/Home/Carousels.jsx";
import HeroSection from "./components/Home/HeroSection.jsx";

export default function Home() {
  const [lastActivityLocal, setLastActivityLocal] = useState("");

  useEffect(() => {
    const updateUserActivity = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { error } = await supabase
            .from("profiles")
            .update({ last_activity: new Date().toISOString() })
            .eq("email", user.email);

          if (error) {
            console.error("Error updating user activity:", error.message);
          }
        }
      } catch (error) {
        console.error("Error updating user activity:", error.message);
      }
    };

    updateUserActivity();

    const realTimeConnection = supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => {
          console.log("Real-time update received:", payload);

          // Menggunakan optional chaining untuk menghindari kesalahan
          const lastActivityUTC = moment(payload?.record?.last_activity);

          // Periksa apakah lastActivityUTC valid sebelum mencoba mengonversi
          if (lastActivityUTC.isValid()) {
            // Konversi ke zona waktu Asia/Jakarta dan format
            const lastActivityLocalString = lastActivityUTC
              .tz("Asia/Jakarta")
              .format("LLL");

            // Update state atau lakukan tindakan lain dengan timestamp lokal
            setLastActivityLocal(lastActivityLocalString);
          } else {
            console.error(
              "Format timestamp tidak valid:",
              payload?.record?.last_activity
            );
          }
        }
      )
      .subscribe();

    return () => {
      realTimeConnection.unsubscribe();
    };
  }, []);

  return (
    <div>
      {/* <h1>Hello World</h1>
           <Carousels />
      <p>Last Activity (Local): {lastActivityLocal}</p> */}

      
      <HeroSection />
    </div>
  );
}
