// components/BottomNavigation.js
import Link from "next/link";
import { FcAcceptDatabase } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-500 p-4 flex justify-around items-center md:hidden text-white">
      <Link href="/me/absen">
        <FcAcceptDatabase size="2em" />
        Presensi
      </Link>
      <section className="rounded-full">
        <Link href="/">
          <IoMdHome size="2em" />
          Home
        </Link>
      </section>
      <Link href="/me">
        <BsFillPersonLinesFill size="2em" color="" />
        Saya
      </Link>
    </div>
  );
};

export default BottomNavigation;
