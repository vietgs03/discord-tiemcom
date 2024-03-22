'use client'
import { SignIn } from "@clerk/nextjs";
import { Clerk } from "@clerk/nextjs/server";

const clerk =  Clerk({
    apiKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
}); 
export default function Page() {


    return (

        <SignIn  />
    );
}