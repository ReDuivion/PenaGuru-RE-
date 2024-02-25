// components/BottomNavigation.js
"use client"
import Link from "next/link";
import { FcAcceptDatabase } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import {useState, useEffect} from "react";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
const BottomNavigation = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (<>
   {/* <div
        className="fixed bottom-20 right-0 p-4 "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <div className="rounded-3xl md:hidden bg-gray-200">
        {showTopBtn && (
         <button
         aria-label="Scroll To Top"
         type="button"
         class="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
         onClick={goToTop}
       >
         <svg class="h-5 w-5"  fill="currentColor">
           <path
             fill-rule="evenodd"
             d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
             clip-rule="evenodd"
           ></path>
         </svg>
       </button>
        )}</div>
      </div> */}
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
    </div></>
  );
};

export default BottomNavigation;
