import React from "react";

export default function Superiority() {
  return (
    <>
      <main className="pb-96">
        <div>
          {/*TEKS */}
          <section>
            <div className=" m-3">
              <section className="m-5">
                <p className="text-sm uppercase text-slate-500">Project Kami</p>
                <h1 className="text-lg first-letter:uppercase font-bold text-slate-700">
                  Program Aplikasi Sekolah
                </h1>
                <h2 className="text-lg first-letter:uppercase font-bold text-slate-700">
                  Sesuai Kebutuhan Guru
                </h2>
              </section>
            </div>
            {/* GAMBAR FUNGSI */}
            <div className=" m-12">
              <section className="grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8afsM4GuidyDmcYvxdeGCLRpreZlZOxXzj90X8jURUg&s"></img>
                <p className="mt-9">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis cupiditate, sunt facere maxime repudiandae odio
                </p>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
