"use client";
// pages/editadmin.js
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
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
  Input,
  Spacer,
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
export default function EditAdmin() {
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
    motto: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error.message);
          // Redirect or handle error as needed
          return;
        }

        setUserEmail(user.email);

        // Check if email exists in staffs
        const { data: existingStaffData, error: existingStaffError } =
          await supabase
            .from("admins")
            .select("*")
            .eq("email", user.email)
            .single();

        // Check if email exists in profiles
        const { data: existingProfileData, error: existingProfileError } =
          await supabase
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .single();

        if (existingStaffError || existingProfileError) {
          console.error(
            "Error checking existing staff or profile:",
            existingStaffError?.message || existingProfileError?.message
          );
        }

        if (existingStaffData || existingProfileData) {
          console.log(
            'Email sudah ada di tabel "admins" atau "profiles", redirect ke /editstaff atau /edit'
          );
          // Redirect ke halaman yang sesuai
          router.push(existingStaffData ? "/me/editstaff" : "/me/edit");
          return;
        }

        // Continue with fetching admin data
        const { data: adminData, error: adminError } = await supabase
          .from("staffs")
          .select("*")
          .eq("email", user.email)
          .single();

        if (adminError) {
          console.error("Error fetching admin data:", adminError.message);
          // Redirect or handle error as needed
          return;
        }

        setUserData(adminData || {});
      } catch (error) {
        console.error("Error fetching user or admin data:", error.message);
        // Redirect or handle error as needed
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use select to check if user already exists in staffs or profiles
      const { data: existingStaffData, error: existingStaffError } =
        await supabase
          .from("admins")
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
          "Error checking existing admins or profile:",
          existingStaffError?.message || existingProfileError?.message
        );
      }

      if (existingStaffData || existingProfileData) {
        console.log(
          'Email sudah ada di tabel "admins" atau "profiles", redirect ke /editstaff atau /edit'
        );
        // Redirect ke halaman yang sesuai
        router.push(existingStaffData ? "/me/editstaff" : "/me/edit");
        return;
      }

      // Continue with the update or insert in admins
      const { data: existingUserData, error: existingUserError } =
        await supabase
          .from("staffs")
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
        const { data, error } = await supabase
          .from("staffs")
          .update({
            nama_user: userData.nama_user,
            jenis_user: userData.jenis_user,
            motto: userData.motto,
            // Add more fields here...
          })
          .eq("email", userEmail);

        if (error) {
          console.error("Error updating user profile:", error.message);
          // Redirect or handle error as needed
          return;
        }

        console.log("User profile updated successfully:", data);
      } else {
        // User does not exist, perform insert
        const { data, error } = await supabase.from("staffs").insert([
          {
            email: userEmail,
            nama_user: userData.nama_user,
            jenis_user: userData.jenis_user,
            motto: userData.motto,
            // Add more fields here...
          },
        ]);

        if (error) {
          console.error("Error inserting user profile:", error.message);
          // Redirect or handle error as needed
          return;
        }

        console.log("User profile inserted successfully:", data);
      }

      // Redirect to the desired page after successful update or insert
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error updating/inserting user profile:", error.message);
      // Redirect or handle error as needed
    }
  };

  return (
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
  );
}
