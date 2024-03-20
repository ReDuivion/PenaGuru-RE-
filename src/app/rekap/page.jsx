
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../config/supabase';
import Rekap from '../components/Rekap/Rekap';

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
   <>
   <Rekap/>
   </>
  );

}

