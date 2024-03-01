"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../config/supabase";
import { lazy } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import Rekap from "../components/Rekap/Rekap";

export default function RekapPage() {
  const Loader = lazy(() => import("../utils/Skeletons"));
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  useEffect(() => {
    async function fetchUniqueDates() {
      try {
        const { data, error } = await supabase.from("unique_dates").select();
        if (error) {
          throw error;
        }
        3;
        setUniqueDates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching unique dates:", error.message);
        setError("Failed to fetch unique dates.");
        setLoading(false);
      }
    }

    fetchUniqueDates();
  }, []);

  if (loading) {
    <div>Loading..</div>;
    console.log(loading)
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-center text-3xl sm:text-5xl mb-5 mt-3">
        Rekap Absensi
      </h1>
      <Suspense fallback={<Loader/>} className="">

        <Rekap />
      </Suspense>
    </div>
  );
}
