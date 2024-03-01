
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../config/supabase';

export default function RekapPage() {
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUniqueDates() {
      try {
        const { data, error } = await supabase.from('unique_dates').select();
        if (error) {
          throw error;
        }
        setUniqueDates(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching unique dates:', error.message);
        setError('Failed to fetch unique dates.');
        setLoading(false);
      }
    }

    fetchUniqueDates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Rekap Absensi</h1>
      <ul>
        {uniqueDates.map((date) => (
          <li key={date.tanggal_absensi}>

       
            <Link href={`/rekap/${date.tanggal_absensi}`}>
        

            <Link href={`/Rekap/${date.tanggal_absensi}`}>


              {new Date(date.tanggal_absensi).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

}

}
