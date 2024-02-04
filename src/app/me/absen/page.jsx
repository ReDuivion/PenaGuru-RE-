"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { startOfDay, setHours, format } from "date-fns";

const Presensi = () => {
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
  });
  const [presensiData, setPresensiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", user.email)
          .single();

        if (profileError) {
          throw new Error(profileError.message);
        }

        setUserData(profileData || {});
        await checkPresensi(profileData.id); // Menggunakan ID pengguna dari profil untuk memeriksa presensi
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, []);

  const checkPresensi = async (userId) => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("absensi")
        .select("*")
        .eq("id_guru", userId)
        .eq("tanggal_absensi", today);
      if (error) {
        throw error;
      }
      if (data.length > 0) {
        setPresensiData(data[0]);
      } else {
        setPresensiData(null); // Tidak ada presensi untuk hari ini
      }
    } catch (error) {
      console.error("Error checking presensi status:", error.message);
    }
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      const today = format(now, 'yyyy-MM-dd');
      const checkInTime = setHours(startOfDay(now), 7); // Check-in pada jam 7 pagi setiap hari
  
      // Periksa apakah sudah lewat waktu check-in
      if (now > checkInTime) {
        console.log('Maaf, sudah melewati waktu check-in.');
        return;
      }
  
      // Simpan data presensi ke dalam tabel absensi
      const { error } = await supabase
        .from('absensi')
        .insert([{ id_guru: userData.id, tanggal_absensi: today, check_in: format(now, 'yyyy-MM-dd HH:mm:ss') }]);
      if (error) {
        throw error;
      }
      console.log('Check-In berhasil ditambahkan.');
      await checkPresensi(userData.id); // Periksa kembali presensi setelah penyisipan data baru
    } catch (error) {
      console.error('Error handling check-in:', error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      let checkOutTime;
  
      // Tentukan waktu check-out berdasarkan hari
      switch (now.getDay()) {
        case 1: // Senin
          checkOutTime = setHours(startOfDay(now), 15, 10); // Mengatur jam 15:10 (3:10 PM) untuk Senin
          break;
        case 2: // Selasa
          checkOutTime = setHours(startOfDay(now), 15, 50); // Mengatur jam 15:50 (3:50 PM) untuk Selasa
          break;
        case 3: // Rabu dan Kamis
        case 4:
          checkOutTime = setHours(startOfDay(now), 14, 30); // Mengatur jam 14:30 (2:30 PM) untuk Rabu dan Kamis
          break;
        case 5: // Jumat
          checkOutTime = setHours(startOfDay(now), 11, 30); // Mengatur jam 11:30 (11:30 AM) untuk Jumat
          break;
        default:
          checkOutTime = null; // Tidak ada check-out untuk hari lainnya
          break;
      }
  
      // Periksa apakah sudah melewati waktu check-out atau belum
      if (!checkOutTime || now < checkOutTime) {
        console.log('Belum saatnya untuk Check-Out.');
        return;
      }
  
      // Update data presensi ke dalam tabel absensi
      const { error } = await supabase
        .from('absensi')
        .update({
          check_out: format(now, 'yyyy-MM-dd HH:mm:ss') // Perbaikan: format tanggal sesuai dengan 'tanggal_absensi'
        })
        .eq('id', presensiData.id);
      if (error) {
        throw error;
      }
      console.log('Check-Out berhasil diperbarui.');
      setPresensiData(null); // Mengatur presensiData kembali ke null untuk menyimpan check-in berikutnya
    } catch (error) {
      console.error('Error handling check-out:', error.message);
    }
  };

  const handleLogout = () => {
    // Tambahkan logika logout di sini
    console.log("Silahkan pulang.");
  };

  if (!userData.nama_user || !userData.jenis_user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Presensi</h1>
      <p>
        Selamat datang, {userData.nama_user} ({userData.jenis_user})
      </p>
      {presensiData && presensiData.check_out ? (
        <p>Kamu sudah absen. Silahkan pulang.</p>
      ) : (
        <div>
          {presensiData && presensiData.check_in ? (
            <button onClick={handleCheckOut}>Check-Out</button>
          ) : (
            <button onClick={handleCheckIn}>Check-In</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Presensi;
