"use client"
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  IconButton,
  Avatar,
  Heading,
  Text,
  Input,
  Stack,
  BsThreeDotsVertical,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import {useState} from "react";
export default function Notifikasi() {
  return (
    <div className="mb-96">
     <div className="flex-1 p-4">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Notifikasi Admin
            </h1>
            <div className="mb-1">
            <Stack spacing={3}>
  <Input variant='filled' placeholder='Cari Notifikasi...' />
              </Stack>
            </div>
            </div>
            </div>
    <Card className="w-full">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <div className="justify-start items-start">
              <div className="avatar placeholder mt-2 mb-3">
                <div className="bg-purple-600 text-white rounded-full w-12 ">
                  <span class="text-lg">U</span>
                </div>
              </div>
            </div>
            <Box>
              <Text fontSize="xs" >
                2003-30-22-20:39
              </Text>
              <Heading size="sm" justify="start" items="start">
                Segun Adebayo
              </Heading>
              <Text>sudah absen </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
    </div>
  );
}
