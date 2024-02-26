"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import {
  faCoffee,
  faBackward,
  faGear,
  faUser,
  faUserGroup,
  faMagnifyingGlass,
  faPlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
// import User from "../../middleware/user"
import UserAuth from "../../middleware/user";


export default function EditProfile() {
  const [userEmail, setUserEmail] = useState(null);
  const [jurusanOptions, setJurusanOptions] = useState([]);
  const [userData, setUserData] = useState({
    jenis_user: "",
    jurusan: "",
    kelas: "",
    nama_user: "",
    avatar: "",
    motto: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userType, setUserType] = useState("");
  const router = useRouter();

  async function uploadImage(file, folder) {
    try {
      const { data, error } = await supabase.storage
        .from(folder)
        .upload(file.name, file);

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error Uploading Image", error.message);
      throw error;
    }
  }

  useEffect(() => {
    const fetchJurusanOptions = async () => {
      try {
        const { data: jurusanData, error: jurusanError } = await supabase
          .from("jurusan")
          .select("id, nama_jurusan");

        if (jurusanError) {
          console.error(
            "Error fetching jurusan options:",
            jurusanError.message
          );
        } else {
          setJurusanOptions(jurusanData);
        }
      } catch (error) {
        console.error("Error fetching jurusan options:", error.message);
      }
    };

    fetchJurusanOptions();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
        } else {
          setUserEmail(user.email);

          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .single();
          console.log(data);

          if (error) {
            console.error("Error fetching user data:", error.message);
          } else {
            setUserData(data || {});
            console.log(data);

            const res = await supabase.storage
              .from("gambar")
              .getPublicUrl(data.avatar);

            if (res.error) {
              console.error("Error fetching avatar URL:", res.error.message);
            } else {
              setAvatarUrl(res.data.publicUrl);
              console.log(data);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const insertProfile = async (fieldsToInsert) => {
    try {
      let tableName;

      if (userType === "Guru") {
        tableName = "gurus";
      } else if (userType === "Staff") {
        tableName = "staffs";
      } else if (userType === "Admin") {
        tableName = "admins";
      }

      const { error } = await supabase.from("profiles").upsert({
        ...fieldsToInsert,
        email: userEmail,
      });

      if (error) {
        console.error("Insert error", error.message);
        return { success: false, error: error.message };
      }

      console.log("Profile inserted successfully");
      return { success: true };
    } catch (error) {
      console.error("Error inserting profile", error.message);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (email, fieldsToUpdate) => {
    try {
      let tableName;

      if (userType === "Guru") {
        tableName = "gurus";
      } else if (userType === "Staff") {
        tableName = "staffs";
      } else if (userType === "Admin") {
        tableName = "admins";
      }

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update(fieldsToUpdate)
        .eq("email", email);

      if (updateError) {
        console.error("Update error", updateError.message);
        return { success: false, error: updateError.message };
      }

      console.log("Profile updated successfully");

      // Fetch updated user data
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError) {
        console.error("Fetch user error", fetchError.message);
        return { success: false, error: fetchError.message };
      }

      // Fetch updated avatar URL
      const avatarRes = await supabase.storage
        .from("gambar")
        .getPublicUrl(data.avatar);

      if (avatarRes.error) {
        console.error(
          "Error fetching updated avatar URL:",
          avatarRes.error.message
        );
        return { success: false, error: avatarRes.error.message };
      }

      console.log("Avatar URL updated successfully");
      return {
        success: true,
        updatedData: data,
        updatedAvatarUrl: avatarRes.data.publicURL,
      };
    } catch (error) {
      console.error(
        "Error updating profile or fetching updated avatar URL:",
        error.message
      );
      return { success: false, error: error.message };
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    try {
      const folder = "gambar";
      const filename = `${uuidv4()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(folder)
        .upload(`${filename}`, file);

      if (uploadError) {
        throw uploadError;
      }

      setUserData((prevData) => ({
        ...prevData,
        avatar: filename,
      }));

      setAvatarUrl(uploadData.publicURL);
    } catch (error) {
      console.error("ERROR UPLOADING AVATAR", error.message);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    

    const updatedFields = {};

    if (userData.userType) {
      updatedFields.userType = userData.userType;
    }

    if (userData.avatar) {
      updatedFields.avatar = userData.avatar;
    }

    if (userData.jenis_user !== "") {
      updatedFields.jenis_user = userData.jenis_user;
    }

    if (userData.jurusan !== "") {
      // Find the selected jurusan object
      const selectedJurusan = jurusanOptions.find(
        (jurusan) => jurusan.nama_jurusan === userData.jurusan
      );

      // If the jurusan is found, update the jurusan_id
      if (selectedJurusan) {
        updatedFields.jurusan_id = selectedJurusan.id;
      }
    }

    if (userData.kelas !== "") {
      updatedFields.kelas = userData.kelas;
    }

    if (userData.motto !== "") {
      updatedFields.motto = userData.motto;
    }

    if (userData.nama_user !== "") {
      updatedFields.nama_user = userData.nama_user;
    }

    try {

      const { data: existingStaffData, error: existingStaffError } =
        await supabase
          .from("staffs")
          .select("*")
          .eq("email", userEmail)
          .single();

      const { data: existingProfileData, error: existingProfileError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("email", userEmail)
          .single();

      if (existingStaffError || existingProfileError) {
        console.error(
          "Error checking existing staff or profile:",
          existingStaffError?.message || existingProfileError?.message
        );
      }

      if (existingStaffData || existingProfileData) {
        console.log(
          'Email sudah ada di tabel "staffs" atau "profiles", redirect ke /editstaff atau /edit'
        );
        // Redirect ke halaman yang sesuai
        router.push(existingStaffData ? "/editstaff" : "/edit");
        return;
      }

      const { data: existingUserData, error: existingUserError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("email", userEmail)
          .single();

      if (existingUserError) {
        console.error(
          "Error checking existing user:",
          existingUserError.message
        );
      }

      if (existingUserData) {
        // User exists, perform update
        const updateResult = await updateProfile(userEmail, updatedFields);

        if (updateResult.success) {
          // Fetch updated user data
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", userEmail)
            .single();

          if (error) {
            console.error("Fetch user error", error.message);
          } else {
            setUserData(data);

            const res = await supabase.storage
              .from("gambar")
              .getPublicUrl(data.avatar);

            if (res.error) {
              console.error("Error fetching avatar URL:", res.error.message);
            } else {
              setAvatarUrl(res.data.publicUrl);
              console.log(data);
            }
          }
        }
      } else {
        // User does not exist, perform insert
        const insertResult = await insertProfile(updatedFields);

        if (insertResult.success) {
          // Optionally, you can perform additional actions after successful insert
        }
      }
    } catch (error) {
      console.error(
        "Error checking existing user or updating/inserting profile:",
        error.message
      );
    }

    window.location.reload;
  };
  // Update user data in the "profiles" table

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <User/> */}
      <UserAuth/>
      <div className="pb-96">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto ">
        <div className="card-body">
          <div className="relative w-3 h-3">
            <FontAwesomeIcon
              icon={faBackward}
              className="text-green-600 cursor-pointer"
              onPress={() => router.push("/me")}
            />
          </div>
          <h2 className="card-title mx-auto">
            Edit Profile <FontAwesomeIcon icon={faPenToSquare} />
          </h2>
          <hr />  

          <div className="card w-full h-32 mx-auto bg-gradient-to-r from-indigo-700  via-blue-500 v to-cyan-400  mb-8">
            <p className="font-bold text-2xl mt-8  text-sky-300 text-center">Pena Guru</p>
            <div className="avatar item-center justify-center text-center">
              <div class="avatar placeholder ">
                <div class="bg-blue-700 text-white rounded-full w-24">
                  <span class="text-4xl">U</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center">{userEmail}</p>
          <div className="card-actions justify-end">
            <form onSubmit={handleFormSubmit}>
              <h1>Nama User:</h1>
              <input
                type="text"
                name="nama_user"
                value={userData.nama_user}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs"
              />
              <h1>Motto Hidup</h1>
              <input
                type="text"
                name="motto"
                value={userData.motto}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs"
              />
              <Button
                color="danger"
                className=" mt-4 w-full"
                variant="solid"
                type="submit"
              >
                Simpan Perubahan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
