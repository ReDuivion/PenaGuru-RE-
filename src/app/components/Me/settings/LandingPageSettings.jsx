"use client";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import { MdOutlinePresentToAll } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { supabase } from "../../../config/supabase.js";
import { useState, useEffect } from "react";
export default function LandingPageSettings() {
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        setUserEmail(user.email);

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", user.email)
          .single();

        if (profileError) {
          throw new Error(profileError.message);
        }

        setUserData(profileData || {});
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="mx-auto text-center m-12">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Avatar"
            />
          </div>
        </div>
        <h1 className="font-bold text-md mt-2">{userData.nama_user}</h1>
        <p className="font-normal">{userData.jenis_user}</p>
      </section>
      <Card className="max-w-[600px] mx-auto">
        <CardHeader>
          <h1 className="text-lg font-semibold">LinkTree</h1>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/edit-profile"
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              Update Profile
              <FaUserEdit className="text-xl" />
            </Link>

            <Link
              href="/your-other-page"
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              Presensi
              <MdOutlinePresentToAll className="text-xl" />
            </Link>
            <Link
              href="/your-other-page"
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              Ganti Password
              <RiLockPasswordLine className="text-xl" />
            </Link>
            <Link
              href="/sign-out"
              className="flex items-center justify-between border-b border-gray-200 py-2 text-red-500"
            >
              SignOut
              <MdLogout className="text-xl" />
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
