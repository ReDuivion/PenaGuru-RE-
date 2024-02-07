'use client'
import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import { format } from "date-fns";
import { Button } from "@chakra-ui/react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    marginRight: 5,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
});

const StatistikDetail = () => {
  const [presensiData, setPresensiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("absensi")
          .select("*")
          .eq("id_guru", user.id); // Mengambil absensi berdasarkan id_guru yang didapatkan dari user

        if (error) {
          throw error;
        }

        setPresensiData(data);
      } catch (error) {
        console.error("Error fetching presensi data:", error.message);
      }
    };

    fetchData();
  }, []);

  const generateStatistikPDF = (checkoutDate) => {
    const filteredData = presensiData.filter(
      (item) => format(new Date(item.check_out), "yyyy-MM-dd") === checkoutDate
    );

    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Statistik Detail</Text>
            {filteredData.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{item.id}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    return MyDocument;
  };

  return (
    <div>
      <h1>Statistik Detail</h1>
      {presensiData ? (
        <div>
          {/* Render PDFDownloadLink for each data */}
          {presensiData.map((item, index) => {
            const checkoutDate = format(new Date(item.check_out), "yyyy-MM-dd");
            return (
              <PDFDownloadLink
                key={index}
                document={generateStatistikPDF(checkoutDate)}
                fileName={`Statistik_Detail_${checkoutDate}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading..." : "Save as PDF"
                }
              </PDFDownloadLink>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StatistikDetail;
