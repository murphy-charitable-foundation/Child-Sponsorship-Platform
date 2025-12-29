"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";

export function AppNavbar() {
  return (
    <Navbar
      maxWidth="full"
      className="border-b border-default-200 bg-white"
      isBordered
    >
      <NavbarBrand>
        <Image
          src="/children/logo.jpg"
          alt="Murphy Charitable Foundation"
          width={48}
          height={48}
        />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <NextLink href="/" className="text-sm text-foreground">
            Home
          </NextLink>
        </NavbarItem>

        <NavbarItem>
          <NextLink href="#" className="text-sm text-foreground">
            Meet the Children ▾
          </NextLink>
        </NavbarItem>

        <NavbarItem>
          <NextLink href="#" className="text-sm text-foreground">
            Who We Are
          </NextLink>
        </NavbarItem>

        <NavbarItem>
          <NextLink href="#" className="text-sm text-foreground">
            About the Program ▾
          </NextLink>
        </NavbarItem>

        <NavbarItem>
          <NextLink href="#" className="text-sm text-foreground">
            Contact
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-3">
        <NavbarItem>
          <Button
            as={NextLink}
            href="#"
            variant="bordered"
            radius="full"
            size="sm"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NextLink}
            href="#"
            color="success"
            radius="full"
            size="sm"
          >
            Donate
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
