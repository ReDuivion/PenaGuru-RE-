import React from "react";

export default function Nav() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center bg-gray-100 min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 px-5 py-10 lg:py-20">
        <div className="ml-5 border border-md rounded-lg my-5 justify-center text-center pb-5 shadow-lg">
          <h1 className="text-5xl font-bold mt-10">Welcome Back</h1>
          <div class="avatar placeholder my-8">
            <div class="bg-purple-600 text-white rounded-full w-24">
              <span class="text-5xl">D</span>
            </div>
          </div>
          <div className="">
            <h1 className="text-2xl">Ir. Hj. Dedu Sulaeman et jimel dot kom</h1>
            <h1 className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <h1 className="">
              Jl. Cisangkuy No. 24 Rt. 05 Rw. 16 Kec. Atlantis
            </h1>
          </div>
          <h1 className="btn btn-ghost mt-5">Edit Profile</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 px-5 py-10 lg:py-20">
        <div className="border border-md w-screen lg:w-3/4 rounded-lg my-5 shadow-lg flex">
          {/* Absen Card 1 */}
          <div className="border border-md m-5 rounded-lg bg-blue-500 w-1/2">
            <h1 className="text-xl mx-5 mt-5 text-white">Administrator</h1>
            <h1 className="ml-5 text-3xl text-white">123456789</h1>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Masuk</h1>
              <h1 className="ml-2 text-5xl mb-2 pb-2">07.00</h1>
            </div>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Keluar</h1>
              <h1 className="ml-2 text-5xl pb-2">15.30</h1>
            </div>
            <div className="flex justify-center">
              <button className="mt-2.5 btn border-0 bg-white text-black w-1/2 rounded-md hover:bg-white hover:text-black text-lg">Absen</button>
            </div>
          </div>

          {/* Absen Card 2 */}
          <div className="border border-md my-5 mr-5 rounded-lg bg-blue-500 w-1/2">
            <h1 className="text-xl mx-5 mt-5 text-white">Administrator</h1>
            <h1 className="ml-5 text-3xl text-white">123456789</h1>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Masuk</h1>
              <h1 className="ml-2 text-5xl mb-2 pb-2">07.00</h1>
            </div>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Keluar</h1>
              <h1 className="ml-2 text-5xl pb-2">15.30</h1>
            </div>
            <div className="flex justify-center">
              <button className="mt-2.5 btn border-0 bg-white text-black w-1/2 rounded-md hover:bg-white hover:text-black text-lg">Absen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
