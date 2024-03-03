"use client";
import React from "react";
import { supabase } from "@/app/config/supabase";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Card, CardHeader, CardBody, CardFooter, Box,
 Button, Heading,Stat,
 StatLabel,
 StatNumber,
 StatHelpText,
 StatArrow,
 StatGroup,
  Stack, Flex, StackDivider, ButtonGroup, /*Image,*/
Text } from '@chakra-ui/react'
import PenaGuru from "../../../../../public/PenaGuru.png"
import IdGuru from "@/app/components/idguru/idguru";
export default function Detail() {
  // const { idguru } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  // const [guru, setGuru] = useState(null);
  // useEffect(() => {
  //   const fecthNamaGuru = async () => {
  //     try {
  //       const { data: absensiData, error: absensiError } = await supabase
  //         .from("absensi")
  //         .select("*")
  //         .eq("tanggal_absensi", idguru)
  //         .single();
  //       if (error) {
  //         throw error;
  //       }
  //       setGuru(absensiData);
  //       setIsLoading(false);
  //       // document.title = `Rekap ${data.tanggal_2}`;
  //       for (let absen of absensiData) {
  //         const res = await supabase.storage
  //           .from("guru")
  //           .getPublicUrl(absen.foto_kegiatan);

  //         if (res.error) {
  //           console.error("Error fetching image URL:", res.error.message);
  //         } else {
  //           absen.foto_kegiatan_url = res.data.publicUrl;
  //         }
  //       }
  //     } catch (error) {
  //       console.error("error fetch");
  //       setIsLoading(false);
  //     }
  //   };
  //   if (idguru) {
  //     fecthNamaGuru();
  //   }
  // }, [idguru]);
  // if(isLoading){
  //     return <p>Loading wait for a moment...</p>
  // }
  return (
 <div>
  <IdGuru/>
 </div>
  );
}
