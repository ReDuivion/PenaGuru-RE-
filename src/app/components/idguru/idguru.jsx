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
import PenaGuru from "../../../../public/PenaGuru.png"
export default function IdGuru() {
  return (
    <>
      <div className="pb-96">
        <Card className="h-screen">
          <CardHeader className="items-center justify-items-center text-center">
            <Heading size="md">Laporan Absen</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="4">
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Box className="space-between">
                    <Heading size="xs" textTransform="uppercase">
                      Keterangan Guru
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Nama Guru: Wawan
                    </Text>
                    <Text pt="2" fontSize="sm">
                      Id Guru: 108
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Box className="items-center mx-auto justify-items-center text-center">
                <Image
                  src={PenaGuru}
                  width={200}
                  height={200}
                  className="items-center justify-items-center text-center "
                />
              </Box>
              <Stack spacing="4">
                <div className="mx-auto flex-end-component">
                  <Box>
                    <Stat>
                      <StatLabel>Check In</StatLabel>
                      <StatNumber fontSize="medium">
                        2024-02-06T06:24:08+07:00
                      </StatNumber>
                    </Stat>
                  </Box>
                  <Box>
                    <Stat>
                      <StatLabel>Check Out</StatLabel>
                      <StatNumber fontSize="medium">
                        2024-02-06T06:24:08+07:00
                      </StatNumber>
                      <StatLabel>Tanggal</StatLabel>
                      <StatHelpText>2024-02-06T06:24:08+07:00</StatHelpText>
                    </Stat>
                  </Box>
                </div>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
