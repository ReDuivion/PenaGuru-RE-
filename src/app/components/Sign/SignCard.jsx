
'use client'
// Import the necessary modules from Chakra UI
import { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import { supabase } from '../../config/supabase.js'
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const SignCard = () => {
  const toast = useToast(); // Initialize the useToast hook
  const router = useRouter(); // Get the router instance

  const [tambahUsers, setTambahUsers] = useState({  
    email: "",
    password: "",
    password2: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setTambahUsers({ ...tambahUsers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    if (tambahUsers.password !== tambahUsers.password2) {
      toast({
        title: "Error",
        description: "Password/Email tidak sama",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: tambahUsers.email,
        password: tambahUsers.password,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Gagal, " + error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Sukses",
          description: "Berhasil",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/login"); // Use router for navigation instead of redirect
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={tambahUsers.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={tambahUsers.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          value={tambahUsers.password2}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Signup"}
        </button>
      </form>
    </>
  );
};

export default SignCard;
