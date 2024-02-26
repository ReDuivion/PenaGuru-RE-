"use client";
import React from "react";
import { Input } from "@chakra-ui/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { startOfDay, setHours, format } from "date-fns";
import { supabase } from "../../config/supabase";
export default function LandingPage() {
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
  });
  const [presensiData, setPresensiData] = useState(null);
  const [foto, setFoto] = useState(null);
  const [placement, setPlacement] = useState("bottom");
  const [size, setSize] = useState("md");
  const [user, setUser] = useState(null);
  const [absensi, setAbsensi] = useState([]);

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
          const guruId = profileData?.id;
        if (!guruId) {
          console.error("Guru ID is null or undefined.");
          return;
        }
        const { data: absensiData, error: absensiError } = await supabase
        .from("absensi")
        .select("*")
        .eq("id_guru", guruId)
        .order("tanggal_absensi", { ascending: false }) 
        .limit(2);
    if (absensiError) {
      console.error("Error fetching absensi data:", absensiError);
      return;
    }

    setAbsensi(absensiData);
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

      const { error: checkInError } = await supabase.from("absensi").insert([
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
          checkOutTime = setHours(startOfDay(now), 9, 10);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    
      <div className="flex flex-col lg:flex-row justify-center lg:justify-start">
        <div className="ml-5 lg:mr-5 border border-md  w-full lg:w-1/2 rounded-lg my-5 justify-center text-center pb-5 shadow-lg">
          <h1 className="text-5xl font-bold mt-10">Welcome Back</h1>
          <div class="avatar placeholder my-8">
            <div class="bg-purple-600 text-white rounded-full w-24">
              <span class="text-5xl">D</span>
            </div>
          </div>
          <div className="">
            <h1 className="text-2xl">{userData.email}</h1>
            <h1 className="mb-2">({userData.nama_user})</h1>
            <h1 className="text-2xl">{userData.jenis_user}</h1>
          </div>
          <h1 className="btn btn-ghost ">Edit Profile</h1>
        </div>

        <div className="border border-md w-full lg:w-screen rounded-lg my-5 shadow-lg flex flex-col lg:flex-row">
          <div className="border border-md m-5 rounded-lg bg-blue-500 w-full lg:w-1/2">
            <h1 className="text-xl mx-3 mt-5 text-white">Administrator</h1>
            <h1 className="ml-3 text-3xl text-white">123456789</h1>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Masuk</h1>
              <div className="flex">
                <h1 className="ml-2 text-5xl mb-2 pb-2">07.00</h1>
                <h1 className="mt-5 ml-1 text-xl">Senin, 2/4/2024</h1>
              </div>
            </div>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Keluar</h1>
              <div className="flex">
                <h1 className="ml-2 text-5xl pb-2">15.30</h1>
                <h1 className="mt-5 ml-1 text-xl">Senin, 2/4/2024</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-2.5 btn border-0 bg-white text-black w-full lg:w-1/2 rounded-md hover:bg-white hover:text-black text-lg"
                onClick={onOpen}
              >
                Absen
              </button>
            </div>
          </div>

          <div className="border border-md my-5 mr-5 rounded-lg w-full lg:w-1/2 bg-blue-500">
            <div className="justify-center mt-5 flex text-center rounded-lg">
              <div className="bg-white w-1/4 p-2 rounded-lg">
                <h1>Jarak dari kantor</h1>
                <h1 className="font-bold text-2xl">200 Km</h1>
              </div>
            </div>
            <h1 className="text-center text-white mt-3 mb-2 text-2xl font-bold">
              Lokasi
            </h1>
            <div className="bg-white flex justify-center mx-5 text-center rounded-lg mb-4 h-52">
              <h1 className="">Ceritanya ini map</h1>
            </div>
          </div>
        </div>
      </div>
      {absensi.map((absen, index) => (
            <div className="mb-4" key={index}>
      <div class="border border-md shadow-md rounded-md mx-5 mb-5">
        <div className="lg:flex">
          <div className="stat place-items-center">
            <div class="stat-figure text-secondary"></div>
            <div class="stat-title">Jam Masuk</div>
            <div class="stat-value text-xl"> {absen.check_in}</div>
          </div>
          <div className="stat place-items-center">
            <div class="stat-figure text-secondary"></div>
            <div class="stat-title">Jam Keluar</div>
            <div class="stat-value text-xl"> {absen.check_out}</div>
            <div class="stat-figure text-secondary"></div>
          </div>
        </div>
      </div>
</div>
      ))}
      <Link
        href="/me/statistik"
        className="underline text-blue-500 flex justify-center"
      >
        Show More
      </Link>

      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                {presensiData && presensiData.check_out ? (
                  <p>Silahkan Pulang.</p>
                ) : (
                  <div>
                    {presensiData && presensiData.check_in ? (
                      <div>
                        <p>Silahkan CheckOut</p>
                      </div>
                    ) : (
                      <>
                        <p>Silahkan CheckIn</p>
                      </>
                    )}
                  </div>
                )}
              </ModalHeader>
              <ModalBody>
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
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={eventFoto}
                        />
                        <Button onClick={handleCheckIn}>Check-In</Button>
                      </>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
