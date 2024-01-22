'use client'
import Carousels from "./components/Home/Carousels";
import  { supabase } from "./config/supabase.js"
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    // Fungsi untuk memperbarui aktivitas pengguna
    const updateUserActivity = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Mengupdate data di database Supabase
          const { error } = await supabase
            .from('profiles')
            .update({ last_activity: new Date().toISOString() })
            .eq('email', user.email);

          if (error) {
            console.error('Error updating user activity:', error.message);
          }
        }
      } catch (error) {
        console.error('Error updating user activity:', error.message);
      }
    };

    // Memanggil updateUserActivity untuk pembaruan awal
    updateUserActivity();

    // Membuat koneksi ke WebSocket Supabase dengan saluran 'room1'
    const realTimeConnection = supabase
      .channel('room1')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, payload => {
        console.log('Real-time update received:', payload);
        // Lakukan sesuatu dengan pembaruan, misalnya perbarui state atau tampilkan notifikasi
      })
      .subscribe();

    // Membersihkan koneksi saat komponen unmount
    return () => {
      realTimeConnection.unsubscribe();
    };
  }, []);
  return (
   <div>
    <Carousels/>
    <h1>Hello World</h1>
   </div>
  );
}
