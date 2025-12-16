'use client';
import { Button, HeroUIProvider } from "@heroui/react";
import { Navbar } from "@heroui/react";
import NextLink from "next/link";

export default function Home(){
  return(
    <HeroUIProvider>
      <div>
        <h1>Hello World!</h1>
        <Button color="primary" as={NextLink} href='www.google.com'>
          Go to Google
        </Button>
      </div>
    </HeroUIProvider>
    
  )
}
