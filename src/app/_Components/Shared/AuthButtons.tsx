"use client";


import Link from "next/link";
import { LogOutButton } from "./MobileMenu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  payload: any;
  username: string | null;
}

export const AuthButtons = ({ payload, username }: AuthButtonsProps) => {
  const router = useRouter();

  return (
    <div className="hidden md:flex items-center space-x-3">
      {payload ? (
        <div className="flex items-center space-x-3">
          <div className="text-amber-50 font-medium">
            {/* <span className="hidden lg:inline">Welcome, </span> */}
            <Link href={"/profile"}>
              <span className="truncate max-w-30 cursor-pointer text-black dark:text-white hover:underline">
                {username}
              </span>
            </Link>
          </div>
          <LogOutButton />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button
      onClick={()=>{router.push("/login")}}
  
       
            color="inherit"
           
          >
            Login
          </Button>
          <Button
      onClick={()=>{router.push("/register")}}
            variant="outline"
            color="inherit"
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};
