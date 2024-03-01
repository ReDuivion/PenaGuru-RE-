'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../config/supabase";

export default function Page() {
  const [absensi, setAbsensi] = useState([]);
  const { tanggal, namaguru } = useParams();

  useEffect(() => {
    async function fetchAbsensi() {
      try {
        const decodedTanggal = decodeURIComponent(tanggal);
        
        if (!decodedTanggal || !namaguru) return;

        const { data: absensiData, error } = await supabase
          .from("absensi")
          .select(`
          *,
          profiles:id_guru(nama_user)
        `)
          .eq("tanggal_absensi", decodedTanggal.replace(' ', '+'))
          .eq("id_guru", namaguru);

        if (error) {
          throw error;
        }

        setAbsensi(absensiData);
      } catch (error) {
        console.error("Error fetching absensi:", error.message);
      }
    }

    fetchAbsensi();
  }, [tanggal, namaguru]);

  return (
    <div>
      <h1>Absensi for {namaguru} on {tanggal}</h1>
      <ul>
        {absensi.map((absen) => (
          <li key={absen.id}>
            <p>ID Guru: {absen.id_guru}</p>
            <p>Nama Guru: {absen.profiles.nama_user}</p>
            <p>Tanggal Absensi: {absen.tanggal_absensi}</p>
            <p>Check-in: {absen.check_in}</p>
            <p>Check-out: {absen.check_out}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
