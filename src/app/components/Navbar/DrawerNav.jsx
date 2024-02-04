import { useState, useEffect} from 'react'
import { CiMenuBurger } from "react-icons/ci";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";

import {Button} from "@nextui-org/react"
export default function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  return (
    <>
      <div className='block sm:hidden'>

      <CiMenuBurger  size="2em" className='cursor-pointer' onClick={onOpen}/>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </div>

    </>
  );
}
