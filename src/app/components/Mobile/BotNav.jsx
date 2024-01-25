// components/BottomNavigation.js
import Link from "next/link";
import { FcAcceptDatabase } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-700 p-4 flex justify-around items-center md:hidden text-white">
      <Link href="/">
        <FcAcceptDatabase size="2em" />
        Presensi
      </Link>
      <Link href="/about">
        
        <BsFillPersonLinesFill size="2em" color="" />
        List Guru
      </Link>
  
    </div>
  );
};

export default BottomNavigation;
