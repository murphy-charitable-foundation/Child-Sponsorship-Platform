"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";


export function AppNavbar() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const logout = async () => {
    const supabase = createClient();
    //setUserAuthenticated(false);
    await supabase.auth.signOut();
    router.push("/auth/login");
    
  };


  const userFirstName = user?.user_metadata.first_name || user?.email?.split("@")[0] || "User";
  const userLastName = user?.user_metadata.last_name || "";

  return (
    <Navbar
      maxWidth="full"
      className="border-b border-default-200 bg-white"
      isBordered
    >
      <NavbarBrand>
        <Image
          src="/children/logo.png"
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
          <NextLink href="/sponsorship/children" className="text-sm text-foreground">
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

      <NavbarContent justify="end" className="gap-4 pr-4">
        <NavbarItem>
          {!loading && !user && (
            <Button
              as={NextLink}
              href="/auth/login"
              variant="bordered"
              color="primary"
              radius="md"
              size="sm"
            >
              Login
            </Button>
          )}
          {!loading && user && (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly radius="full" variant="light">
                  <Avatar
                    name={`${userFirstName} ${userLastName}`}
                    size="sm"
                    color="primary"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="logout" onClick={logout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>

        <NavbarItem>
          <Button
            as={NextLink}
            href="#"
            color="secondary"
            radius="md"
            size="sm"
          >
            Donate
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
