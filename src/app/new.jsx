import { useState } from 'react';
import { supabase } from '../../config/supabase';

export default function Foto() {
  const [foto, setFoto] = useState(null);

  
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

      const { data, error } = await supabase.storage
        .from("foto")
        .upload(`foto/${foto.name}`, foto, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error; 
      }

      let urlFoto = data.Key;

      const { data: insertFoto, error: errorFoto } = await supabase
        .from("foto")
        .insert({ foto_kegiatan: urlFoto });

      if (errorFoto) {
        throw errorFoto; 
      }
setFoto(insertFoto)
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
    </>
  );
}
