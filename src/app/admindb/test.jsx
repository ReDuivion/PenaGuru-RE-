import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../config/supabase.js";

const newProfile = () => {
  const [dataProfile, setDataProfile] = useState({
    nama_profile: "",
    organization: "",
    createdAt: "",
  });

  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await db.from("profiles").select("*");
        if (error) {
          console.error(error);
        } else {
          setDataProfile(data);
          console.log("Profile Berhasil Dibuat" + data);
        }
      } catch (error) {
        console.error("Data Tidak Ditemukan");
      }
    }
    init();
  }, []);

  return (
    <>
      <div>
        <ul>
          <li>
            <h1>{dataProfile.nama_profile}</h1>
          </li>
          <li>
            <h1>{dataProfile.organization}</h1>
          </li>
          <li>
            <h1>{dataProfile.createdAt}</h1>
          </li>
        </ul>
      </div>
    </>
  );
};
