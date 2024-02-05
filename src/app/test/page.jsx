'use client'
import { supabase } from "../config/supabase";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [fotoUrls, setFotoUrls] = useState([]);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("test")
          .select("foto_kegiatan");

        if (error) {
          console.error(error.message);
          return;
        }

        const urls = [];
        for (let item of data) {
          const res = await supabase.storage
            .from("foto")
            .getPublicUrl(`foto/${item.foto_kegiatan}`); 

          if (res.error) {
            console.error("Error Fetching Data URL" + res.error.message);
          } else {
            urls.push(res.data.publicUrl);
            console.log(res.data.publicUrl);
          }
        }
        setFotoUrls(urls);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  function eventFoto(e) {
    const selectedFile = e.target.files[0]; 

    if (selectedFile) {
      setFoto(selectedFile); 
    } else {
      console.log("Tidak ada file yang dipilih");
    }
  }
  async function kirimFoto() {
    try {
      if (!foto) {
        console.log("Foto tidak ada");
        return; 
      }

      const { error } = await supabase.storage
        .from("foto")
        .upload(`${foto.name}.jpg`, foto, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error; 
      }


      const fotoUrl = foto.name;


      if (!fotoUrl) {
        console.log("URL foto tidak valid");
        return;
      }

      const { data: insertFoto, error: errorFoto } = await supabase
        .from("test")
        .insert({ foto_kegiatan: fotoUrl });

      if (errorFoto) {
        throw errorFoto; 
      }

      console.log("Foto berhasil dikirim: " + foto.name);
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
    }
  }

  return (
    <>
      <div>
        <h1>Upload foto</h1>
        <input type="file" onChange={eventFoto}></input>
        <button onClick={kirimFoto}>Upload</button>
      </div>
      {fotoUrls.map((url, index) => (
        <img key={index} src={url} width={200} height={200} />
      ))}
    </>
  );
}
