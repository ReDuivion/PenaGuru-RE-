"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";
import { useDisclosure } from "@chakra-ui/react";
export default function page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="">
        <div className="lg:flex">
          <div className="ml-5 border border-md w-96 rounded-lg my-5 justify-center text-center pb-5 shadow-lg mr-5">
            <h1 className="text-5xl font-bold mt-10">Welcome Back</h1>
            <div class="avatar placeholder my-8">
              <div class="bg-purple-600 text-white rounded-full w-24">
                <span class="text-5xl">D</span>
              </div>
            </div>
            <div className="">
              <h1 className="text-2xl">
                Ir. Hj. Dedu Sulaeman et jimel dot kom
              </h1>
              <h1 className="mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
              <h1 className="">
                Jl. Cisangkuy No. 24 Rt. 05 Rw. 16 Kec. Atlantis
              </h1>
            </div>
            <h1 className="btn btn-ghost ">Edit Profile</h1>
          </div>

          <div className="border border-md w-screen rounded-lg my-5 shadow-lg mr-5 flex">
            <div className="border border-md m-5 rounded-lg bg-blue-500 w-1/2">
              <h1 className="text-xl mx-3 mt-5 text-white">Administrator</h1>
              <h1 className="ml-3 text-3xl text-white">123456789</h1>
              <div className="rounded-md m-3 bg-blue-400 text-white">
                <h1 className="ml-2">Absen Masuk</h1>
                <div className="flex">
                  <h1 className="ml-2 text-5xl mb-2 pb-2">07.00</h1>
                  <h1 className="mt-5 ml-1 text-xl">Senin, 2/4/2024</h1>
                </div>
              </div>
              <div className="rounded-md m-3 bg-blue-400 text-white">
                <h1 className="ml-2">Absen Keluar</h1>
                <div className="flex">
                  <h1 className="ml-2 text-5xl pb-2">15.30</h1>
                  <h1 className="mt-5 ml-1 text-xl">Senin, 2/4/2024</h1>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="mt-2.5 btn border-0 bg-white text-black w-1/2 rounded-md hover:bg-white hover:text-black text-lg"
                  onClick={onOpen}
                >
                  Absen
                </button>
              </div>
            </div>

            <div className="border border-md my-5 mr-5 rounded-lg w-full bg-blue-500">
              <div className="justify-center mt-5 flex text-center rounded-lg">
                <div className="bg-white w-1/4 p-2 rounded-lg">
                  <h1>Jarak dari kantor</h1>
                  <h1 className="font-bold text-2xl">200 Km</h1>
                </div>
              </div>

              <h1 className="text-center text-white mt-3 mb-2 text-2xl font-bold">
                Lokasi
              </h1>

              <div className="bg-white flex justify-center mx-5 text-center rounded-lg mb-4 h-52">
                <h1 className="">Ceritanya ini map</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-md shadow-md rounded-md mx-5 mb-5">
          <div className="lg:flex">
            <div className="stat place-items-center">
              <div class="stat-figure text-secondary"></div>
              <div class="stat-title">Jam Masuk</div>
              <div class="stat-value text-xl">2024-02-08T06:31:19+07:00</div>
            </div>
            <div className="stat place-items-center">
              <div class="stat-figure text-secondary"></div>
              <div class="stat-title">Jam Keluar</div>
              <div class="stat-value text-xl">2024-02-08T15:54:05+07:00</div>
              <div class="stat-figure text-secondary"></div>
            </div>
            <div class="stat-desc m-3">Monday, January 10, 2024</div>
          </div>
        </div>
        <div class="border border-md shadow-md rounded-md mx-5 mb-5">
          <div className="lg:flex">
            <div className="stat place-items-center">
              <div class="stat-figure text-secondary"></div>
              <div class="stat-title">Jam Masuk</div>
              <div class="stat-value text-xl">2024-02-08T06:31:19+07:00</div>
            </div>
            <div className="stat place-items-center">
              <div class="stat-figure text-secondary"></div>
              <div class="stat-title">Jam Keluar</div>
              <div class="stat-value text-xl">2024-02-08T15:54:05+07:00</div>
              <div class="stat-figure text-secondary"></div>
            </div>
            <div class="stat-desc m-3">Monday, January 9, 2024</div>
          </div>
        </div>

        <Link
          href="/me/statistik"
          className="underline text-blue-500 flex justify-center"
        >
          Show More
        </Link>
      </div>

      <div>Kleuarga Ayam</div>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Absen Berhasil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Saat jam pulang mohon absen kembali untuk mengisi Absen Pulang
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
