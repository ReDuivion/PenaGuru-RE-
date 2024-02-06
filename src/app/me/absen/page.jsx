
'use client'
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { startOfDay, setHours, format } from "date-fns";
import { Button, Input } from "@chakra-ui/react";

const Presensi = () => {
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
  });
  const [presensiData, setPresensiData] = useState(null);
  const [foto, setFoto] = useState(null);

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
        await checkPresensi(profileData.id);
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
        setPresensiData(null);
      }
    } catch (error) {
      console.error("Error checking presensi status:", error.message);
    }
  };

  const eventFoto = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFoto(selectedFile);
    } else {
      console.log("Tidak Ada File Yang Dipilih");
    }
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      const today = format(now, "yyyy-MM-dd");
      const checkInTime = setHours(startOfDay(now), 7);

      if (now > checkInTime) {
        console.log("Maaf, sudah melewati waktu check-in.");
        return;
      }

      if (!foto) {
        console.log("Silahkan pilih gambar terlebih dahulu.");
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from("guru")
        .upload(`guru/${userData.id}/${today}`, foto);

      if (uploadError) {
        throw uploadError;
      }

      const imageUrl = `guru/${userData.id}/${today}`;

      const { error: checkInError } = await supabase
        .from("absensi")
        .insert([
          {
            id_guru: userData.id,
            tanggal_absensi: today,
            check_in: format(now, "yyyy-MM-dd HH:mm:ss"),
            foto_kegiatan: imageUrl,
          },
        ]);

      if (checkInError) {
        throw checkInError;
      }

      console.log("Check-In berhasil ditambahkan.");
      await checkPresensi(userData.id);
    } catch (error) {
      console.error("Error handling check-in:", error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      let checkOutTime;

      switch (now.getDay()) {
        case 1:
          checkOutTime = setHours(startOfDay(now), 15, 10);
          break;
        case 2:
          checkOutTime = setHours(startOfDay(now), 15, 50);
          break;
        case 3:
        case 4:
          checkOutTime = setHours(startOfDay(now), 14, 30);
          break;
        case 5:
          checkOutTime = setHours(startOfDay(now), 11, 30);
          break;
          case 6:
            checkOutTime = setHours(startOfDay(now), 9, 10)
            break;
        default:
          checkOutTime = null;
          break;
      }

      if (!checkOutTime || now < checkOutTime) {
        console.log("Belum saatnya untuk Check-Out.");
        return;
      }

      const { error } = await supabase
        .from("absensi")
        .update({
          check_out: format(now, "yyyy-MM-dd HH:mm:ss"),
        })
        .eq("id", presensiData.id);
      if (error) {
        throw error;
      }
      console.log("Check-Out berhasil diperbarui.");
      setPresensiData(null);
    } catch (error) {
      console.error("Error handling check-out:", error.message);
    }
  };

  const handleLogout = () => {
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
            <div>
              <Button onClick={handleCheckOut}>Check-Out</Button>
            </div>
          ) : (
            <>
              <Input type="file" accept="image/*" onChange={eventFoto} />
              <Button onClick={handleCheckIn}>Check-In</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Presensi;
