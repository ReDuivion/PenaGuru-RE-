"use client";

import React from "react";
import Image from "next/image";
import contactus from "../../../public/contactus.png";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

export default function page() {
  const sizes = ["sm", "md", "lg"];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        <div className="flex">
          <div className="bg-sky-500 w-screen h-screen md:w-1/2 lg:w-1/2 xl:w-1/2 md:mr-3">
            <h1 className="font-bold text-4xl text-white ml-5 mt-5 text-center md:text-left">
              Contact Us!
            </h1>
            <h1 className="text-white mx-5 mt-3 text-lg text-center md:text-left">
              Mengalami bug atau error? Kebingungan? Memiliki saran?
            </h1>
            <h1 className="text-white ml-5 mt- text-xl font-bold text-center md:text-left">
              Kontak saja kami!
            </h1>
            <h1 className="text-white ml-5 mt-3 text-lg opacity-75 hover:opacity-100">
              Nama
            </h1>
            <div className="mx-5 mt-1">
              <Input
                type="name"
                label=""
                placeholder="Ketik nama anda disini."
              />
            </div>
            <h1 className="text-white ml-5 mt-3 text-lg opacity-75 hover:opacity-100">
              Email
            </h1>
            <div className="mx-5 mt-1">
              <Input
                type="email"
                label=""
                placeholder="Ketik email anda disini. Contoh : emailsaya@gmail.com"
              />
            </div>
            <h1 className="text-white ml-5 mt-3 text-lg opacity-75 hover:opacity-100">
              Pesan
            </h1>
            <div className="mx-5 mt-1">
              <Textarea
                minRows={6}
                maxRows={10}
                type="message"
                label=""
                placeholder="Ketik pesan anda disini."
              />
            </div>
            <button
              className="btn bg-white text-sky-500 mx-5 mt-5 flex justify-center md:float-right border-sky-500 hover:bg-sky-500 hover:text-white hover:border-2 hover:border-white text-lg" onClick={onOpen}
            >
              Kirim Pesan
            </button>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesan Anda Sudah Terkirim</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Mohon tunggu jawaban dari kami.
          </ModalBody>

          <ModalFooter>
            <button className="btn bg-red-500 text-white border-2 border-white hover:border-2 hover:border-red-500 hover:text-red-500" onClick={onClose}>
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            
          </div>
          <div className="xl:ml-24 w-0 xl:w-auto lg:w-auto md:w-auto">
            <Image src={contactus} />
          </div>
        </div>
      </div>
    </>
  );
}
