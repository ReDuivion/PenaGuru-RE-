"use client";
// pages/admin-dashboard.js
import { BiSolidDashboard } from "react-icons/bi";
import { TbBell } from "react-icons/tb";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.js";
import { MdCoPresent } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import TeacherCard from "../components/Guru/TeacherCard.jsx";
import moment from "moment";
import Link from "next/link";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import AdminRouteProtection from "../components/Admin/AdminRouterProtection.jsx";
import BottomNavigation from "../components/Mobile/BotNav.jsx";
import { FcAcceptDatabase } from "react-icons/fc";
const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataAdmin, setDataAdmin] = useState({
    nama_user: "",
    jenis_user: "",
  });
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

    return currentTime.diff(activityTime, "minutes") <= thresholdMinutes;
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*");

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
      .channel("presence:teachers")
      .on("UPDATE", (payload) => {
        // Handle the update event for the 'profiles' table
        console.log("Profile updated:", payload);

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
          .select("*")
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
          setDataAdmin(adminData);
          console.log(setDataAdmin);
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
      const { error } = await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!isAdmin) {
    return <div>Anda tidak memiliki akses ke admin dashboard</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-gray-800 pb-16">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 bg-slate-100 ">
          {/* Sidebar content */}
          <div className="p-4 shadow-sm">
            <div className="text-center ">
              <RiAdminFill size={"2em"} color="" className="" />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 hidden md:block lg:block xl:block">
              Welcome Admin: {dataAdmin.nama_user}
            </h2>
            <div className="">
              <div className="hidden">
                <Link href="#" passHref>
                  <Button className="text-white bg-blue-400 xs:hidden sm:hidden md:hidden lg:hidden xl:hidden mb-3 w-full">
                    Menu 1
                  </Button>
                </Link>
                <Link href="#" passHref>
                  <Button className="text-white bg-blue-400  xs:hidden sm:hidden md:hidden lg:hidden xl:hidden mb-3 w-full">
                    Menu 2
                  </Button>
                </Link>
                <Link href="#" passHref>
                  <Button className="text-white bg-blue-400 xs:hidden sm:hidden md:hidden lg:hidden xl:hidden mb-3 w-full">
                    Settings
                  </Button>
                </Link>
                <Link href="/" passHref>
                  <Button
                    onClick={handleLogout}
                    color="danger"
                    className=" block md:hidden lg:hidden xl:hidden mb-3 w-full"
                  >
                    Logout
                  </Button>
                </Link>
              </div>

              <div className="hidden md:block lg:block xl:block">
                <Link
                  className="btn flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition ease-in-out delay-150 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 btn-neutral mb-2"
                  href="#"
                >
                  <MdCoPresent size={"2em"} />
                  Kehadiran
                </Link>
                <Link
                  className="btn flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition ease-in-out delay-150 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mb-2"
                  href="#"
                >
                  <FcStatistics size={"2em"} />
                  Statistik Guru
                </Link>
                <Link
                  className="btn flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition ease-in-out delay-150 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mb-2"
                  href="/admindb/nontifikasi"
                >
                  <TbBell  size={"2em"} />
                  Notifikasi
                </Link>

                <Link
                  className="btn flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition ease-in-out delay-150 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mb-2"
                  href="#"
                >
                  Daftar Guru
                </Link>
                <Link
                  className="btn flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition ease-in-out delay-150 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mb-2"
                  href="admindb/email"
                ><MdOutlineMarkEmailUnread size={"2em"}/>
                  Email
                </Link>

                {/* Link href="/" passHref>
              <Button
              onClick={handleLogout}
              color="danger"
              className=" hidden md:block lg:block xl:block font-semibold mb-3 w-full"
              >
              Logout
              </Button>
            </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Main content */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-2">
              Selamat datang di Admin dashboard
            </h1>
            <h2 className="text-lg mb-4">Email Admin: {userEmail}</h2>

            {/* Search Bar */}
            <div className="mb-4">
              <Input
                placeholder="Cari guru..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Statistik atau Widget lainnya */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Widget 1 */}
              <div className="bg-white p-4 rounded shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2">Jumlah Guru</h3>
                  <BsFillPersonLinesFill size="2em" className="ml-auto" />
                </div>
                <p className="text-xl">{teachers.length}</p>
              </div>

              {/* Widget 2 */}
              <div className="bg-white p-4 rounded shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2">Guru Online</h3>
                  <BsFillPersonLinesFill size="2em" className="ml-auto" />
                </div>

                <p className="text-xl">
                  {
                    teachers.filter((teacher) =>
                      isTeacherOnline(teacher.last_activity)
                    ).length
                  }
                </p>
              </div>

              {/* Widget 3 */}
              {/* ... */}
            </div>

            {/* Display list of teachers in cards */}
            <div>
              <h2 className="text-xl font-semibold mt-4">Daftar Guru</h2>
              {teachers
                .filter(
                  (teacher) =>
                    teacher.nama_user &&
                    teacher.nama_user
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
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
        <BottomNavigation />
      </div>
    </>
  );
};

export default AdminDashboard;
