'use client'
import { useParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';

export default function RekapTanggalPage() {
  const { tanggal } = useParams()
  const [absensi, setAbsensi] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAbsensi() {
      try {
     
        const decodedTanggal = decodeURIComponent(tanggal);
        
        const { data: absensiData, error: absensiError } = await supabase
          .from('absensi')
          .select('*')
          .eq('tanggal_absensi', decodedTanggal);

        const filteredAbsensi = absensiData.filter((item) => item.check_in && item.check_out);
        setAbsensi(filteredAbsensi);
      } catch (error) {
        console.error(`Error fetching absensi for tanggal ${tanggal}:`, error.message);
        setError(`Failed to fetch absensi for tanggal ${tanggal}.`);
      }
    }

    if (tanggal) {
      fetchAbsensi();
    }
  }, [tanggal]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Rekap Absensi Tanggal</h1>
      <ul>
        {absensi.map((absen) => (
          <li key={absen.id}>
            <p>ID Guru: {absen.id_guru}</p>
            <p>Tanggal Absensi: {absen.tanggal_absensi}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
