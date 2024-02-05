import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import {
    Button,
    NavbarBrand,
    NavbarContent

  }from '@nextui-org/react'
  import { 
    FiMenu,
  } from "react-icons/fi";
  import { GoX } from "react-icons/go";
  import { useState } from 'react';
  import { 
    TiSocialInstagram,
    TiSocialYoutube,
    TiSocialFacebook,
  } from "react-icons/ti";
  import { TfiWorld } from "react-icons/tfi";
  import { useRouter } from "next/navigation";
  export default function Draw() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('left')
    const router = useRouter();
      const handleHom = ()=>{
        router.push("/")
      };
      const handleYt = ()=>{
        router.push("#")
      };
      const handleFb = ()=>{
        router.push("#")
      };
      const handleWeb = ()=>{
        router.push("https://smkn7baleendah.sch.id/")
      };
      const handleIg = ()=>{
        router.push("#")
      };
  
    return (
      <>
        
        <FiMenu size='2em' className='cursor-pointer sm:block md:block lg:hidden xl:hidden'  onClick={onOpen}/>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen} >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px bg-black' className='bg-slate-300'>
                <NavbarContent className=" pr-3" justify="center">
          <NavbarBrand>
            <p
              className="font-bold text-purple-500 cursor-pointer text-2xl"
              onClick={handleHom}
            >
              PenaGuru
            </p>
          </NavbarBrand>
<GoX size='1.5em' className='cursor-pointer sm:block md:block lg:hidden xl:hidden'  onClick={onClose}/>
        </NavbarContent></DrawerHeader >
            <DrawerBody className='bg-slate-300'>
              <p className='cursor-pointer'>Profile</p>
              <p className='cursor-pointer'>Dashboard</p>
              <p className='cursor-pointer'>Login</p>
              <p className='cursor-pointer'>Sign</p>
             <br />
             <br />
             <br />
             <br />
             <br />
             <br />
             <br />
             <br />
              <p>admin@PenaGuru</p>
              <p>123.456.789</p>
            </DrawerBody>
            <DrawerFooter className='bg-slate-300'>
            <TfiWorld onClick={handleWeb} size="1.5em" className='cursor-pointer'/>
            <TiSocialInstagram onClick={handleIg} size="1.5em" className='cursor-pointer'/>
    <TiSocialYoutube onClick={handleYt} size="1.5em" className='cursor-pointer'/>
    <TiSocialFacebook onClick={handleFb} size="1.5em" className='cursor-pointer'/>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }