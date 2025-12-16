'use client';
import { Button } from "@heroui/react";
import { Navbar } from "@heroui/react";
import NextLink from "next/link";


export default function Home(){
  return(
    
    <div className="bg-background text-foreground p-6">
      <h1>Hello World!</h1>
      <Button color="primary" href="https://www.google.com">
        Go to Google
      </Button>

      <div className="border border-border rounded-md p-4">
        Border + radius
      </div>

    </div>
    
  )
}