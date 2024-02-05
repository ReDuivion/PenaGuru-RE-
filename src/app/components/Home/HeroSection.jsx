import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const HeroSection = () => {
  const router = useRouter()

  function handleAbsensei() {
    router.push("/me/absen")
  }
  return (
    <div className="bg-blue-500 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Selamat Datang di PenaGuru
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Solusi presensi modern untuk pendidikan.
        </p>
        
        <div className="flex justify-center">
          <Button
            variant=""
            size="large"
            className="mr-4 bg-green-500"
            onClick={handleAbsensei}
          >
            Mulai Presensi
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="bg-purple-500"
            onClick={() => console.log("Pindah ke halaman tentang")}
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
