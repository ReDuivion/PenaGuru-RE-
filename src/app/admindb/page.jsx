"use client";
// pages/admin-dashboard.js
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.js";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles") // Ganti 'users' menjadi 'profiles'
          .select("*"); // Pilih semua kolom

        if (error) {
          console.error("Error fetching users:", error.message);
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser(); // Gunakan format yang benar
        setUserEmail(user.email);

        const { data: adminData, error: adminError } = await supabase
          .from("admins")
          .select("email")
          .eq("email", user.email)
          .single();

        if (adminError) {
          console.error("Error checking admin access:", adminError.message);
          setIsAdmin(false);
          router.push("/");
        } else if (!adminData) {
          console.log('Email tidak ditemukan di tabel "admins"');
          setIsAdmin(false);
          router.push("/unauthorized");
        } else {
          console.log("User is an admin");
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error checking admin access:", error.message);
        setIsAdmin(false);
        router.push("/");
      }
    };

    checkAdminAccess();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!isAdmin) {
    return <div>Anda tidak memiliki akses ke admin dashboard</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-indigo-100 text-indigo-800">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-indigo-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
        <ul>
          <li>
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Menu 1
            </a>
          </li>
          <li>
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Menu 2
            </a>
          </li>
          <li>
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Settings
            </a>
          </li>
          <li>
            <Button onClick={handleLogout} color="error" auto>
              Logout
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-2">
          Selamat datang di admin dashboard
        </h1>
        <h2 className="text-lg mb-4">Email Pengguna: {userEmail}</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <Input
            placeholder="Cari pengguna..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display list of users */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Daftar Guru</h2>
          <ul>
            {users
              .filter(
                (user) =>
                  user.email &&
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <li key={user.id} className="mb-2">
                  {user.nama_user} - {user.email}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
