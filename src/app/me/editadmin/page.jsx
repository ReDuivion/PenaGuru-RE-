"use client";
// pages/editadmin.js
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
export default function EditAdmin() {
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
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
            .from("staffs")
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
            'Email sudah ada di tabel "staffs" atau "profiles", redirect ke /editstaff atau /edit'
          );
          // Redirect ke halaman yang sesuai
          router.push(existingStaffData ? "/editstaff" : "/edit");
          return;
        }

        // Continue with fetching admin data
        const { data: adminData, error: adminError } = await supabase
          .from("admins")
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

      // Continue with the update or insert in admins
      const { data: existingUserData, error: existingUserError } =
        await supabase
          .from("admins")
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
          .from("admins")
          .update({
            nama_user: userData.nama_user,
            jenis_user: userData.jenis_user,
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
        const { data, error } = await supabase.from("admins").insert([
          {
            email: userEmail,
            nama_user: userData.nama_user,
            jenis_user: userData.jenis_user,
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
    <div>
      <h1>{userEmail}</h1>
      <h1>Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nama User:
          <input
            type="text"
            name="nama_user"
            value={userData.nama_user}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Jenis User:
          <input
            type="text"
            name="jenis_user"
            value={userData.jenis_user}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {/* Add more input fields here... */}
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}
