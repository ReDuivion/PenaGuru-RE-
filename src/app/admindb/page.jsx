'use client'
// pages/admin-dashboard.js
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.js";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import TeacherCard from "../components/Guru/TeacherCard.jsx";
import moment from 'moment';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const isTeacherOnline = (lastActivity) => {
    if (lastActivity === null) {
      return false;
    }

    const currentTime = moment();
    const activityTime = moment(lastActivity);
    const thresholdMinutes = 15;

    return currentTime.diff(activityTime, 'minutes') <= thresholdMinutes;
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*");

        if (error) {
          console.error("Error fetching teachers:", error.message);
        } else {
          setTeachers(data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error.message);
      }
    };

    const channel = supabase
      .channel('presence:teachers')
      .on('UPDATE', (payload) => {
        // Handle the update event for the 'profiles' table
        console.log('Profile updated:', payload);

        const updatedTeacher = payload.new;
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.id === updatedTeacher.id ? updatedTeacher : teacher
          )
        );
      })
      .subscribe();

    const checkAdminAccess = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
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

    fetchTeachers();
    checkAdminAccess();

    // Cleanup function: Unsubscribe from the channel when the component unmounts
    return () => {
      channel.unsubscribe();
    };
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
            placeholder="Cari guru..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display list of teachers in cards */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Daftar Guru</h2>
          {teachers
            .filter(
              (teacher) =>
                teacher.email &&
                teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((teacher) => (
              <TeacherCard
                key={teacher.id}
                name={teacher.nama_user}
                email={teacher.email}
                isOnline={isTeacherOnline(teacher.last_activity)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
