"use client";
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
  Grid,
  BsThreeDotsVertical,
  Image,
  Spacer,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
export default function Email() {
  return (
    <div className="mb-96">
      <div className="flex-1 p-4">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Kontak masuk
          </h1>
          <div className="mb-1">
            <Stack spacing={3}>
              <Input variant="filled" placeholder="Cari Kontak..." />
            </Stack>
          </div>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader className="border-1 border-gray-200">
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <div className="justify-start items-start">
                <div className="avatar placeholder ">
                  <div className="bg-purple-600 text-white rounded-full w-12 ">
                    <span class="text-lg">U</span>
                  </div>
                </div>
              </div>
              <Box>
                <Heading size="sm" justify="start" items="start">
                  wawan Adebayo
                </Heading>
                <Text fontSize="xs">2003-30-22-20:39</Text>
              </Box>

            
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
              <Box>
                <Text>
                  masukan keluhan anda Lorem ipsum dolor sit, amet consectetur
                     </Text>
                <Text pt="2" fontSize="sm">
                  <div className="">
                    <p>
                      <Image
                        className="float-right"
                        width={400}
                        height={250}
                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt=""
                      />
                    </p>
                  </div>
                </Text>
              </Box>
        </CardBody>
      </Card>
    </div>
  );
}
