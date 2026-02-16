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
} from "@heroui/react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

export function AppNavbar() {

  const supabase = createSupabaseClient();

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user?.id) {
        setUserAuthenticated(false);
        return;
      }

      setUserFirstName(data.user.user_metadata.first_name || "");
      setUserLastName(data.user.user_metadata.last_name || "");
      setUserAuthenticated(true);
    };

    fetchUser();
  }, []);

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
          {!userAuthenticated && <Button
            as={NextLink}
            href="/auth/login"
            variant="bordered"
            color="primary"
            radius="md"
            size="sm"
          >
            Login
          </Button>}
          {userAuthenticated && <Avatar
            name={`${userFirstName} ${userLastName}`}
            size="sm"
            color="primary"
          />}
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
