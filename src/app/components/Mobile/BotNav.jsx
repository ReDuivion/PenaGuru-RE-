// components/BottomNavigation.js
import Link from "next/link";
import { FcAcceptDatabase } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-500 p-4 flex justify-around items-center md:hidden text-white">
      <Link href="/me">
        <FcAcceptDatabase size="2em" />
        Presensi
      </Link>
      <Link href="/me">
        <BsFillPersonLinesFill size="2em" color="" />
        Saya
      </Link>
    </div>
  );
};

export default BottomNavigation;
