"use client";
import { useState } from "react";
import { RiStackFill } from "react-icons/ri";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaUserCheck } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const menuItems = [
    "me",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignUpClick = () => {
    router.push("/register");
  };

  const handleGuru = () => {
    router.push("/me/edit");
  };

  const handleStaff = () => {
    router.push("/me/editstaff");
  };

  const handleAdmin = () => {
    router.push("/me/editadmin");
  };

  const handleHome = () => {
    router.push("/");
  };
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p
              className="font-bold text-purple-500 cursor-pointer"
              onClick={handleHome}
            >
              PenaGuru
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <p
              className="font-bold text-purple-500 cursor-pointer"
              onClick={handleHome}
            >
              PenaGuru
            </p>
          </NavbarBrand>
          <NavbarItem>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Link color="purple" className="btn">
                  Integrations
                </Link>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-md p-4">
                <div className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">
                    Popover Content
                  </h2>
                  <RiStackFill />
                </div>
              </PopoverContent>
            </Popover>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="purple" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              onClick={handleLoginClick}
              className="btn bg-dark"
              variant="shadow"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button className="btn bg-dark" href="#" variant="shadow">
                  Member
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onClick={handleSignUpClick}
                  className="text-bold"
                  key="news"
                >
                  Buat Akun (Click Me)
                </DropdownItem>
                <DropdownItem
                  onClick={handleGuru}
                  key="new"
                  startContent={<FaUserCheck />}
                >
                  Edit Guru
                </DropdownItem>
                <DropdownItem
                  onClick={handleStaff}
                  key="copy"
                  startContent={<FaUserGear />}
                >
                  Edit Staff
                </DropdownItem>
                <DropdownItem
                  onClick={handleAdmin}
                  key="edit"
                  startContent={<RiAdminLine />}
                >
                  Edit Admin
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "purple"
                }
                href={item}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
