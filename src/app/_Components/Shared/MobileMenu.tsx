"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { X, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
interface IURL {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface MobileMenuProps {
  pages: IURL[];
  payload: any;
}

export const MobileMenu = ({ pages, payload }: MobileMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const mobileMenu = (
    <>
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-75 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Menu</h2>
          <Button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors mx-2 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          <div className="px-5 py-6 mt-4 border-t border-gray-200 dark:border-gray-700">
            {payload ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:underline"
                    >
                      {payload.username}
                    </Link>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <LogOutButton />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/register");
                  }}
                  variant="outline"
                  className="w-full h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Render mobile menu using portal */}
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
};

export const LogOutButton = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/login",
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Can't log out now. Please check your internet connection.");
    }
  };
  
  return < Button
    onClick={onLogout}
    className="h-11 bg-red-600 hover:bg-red-700 text-white font-medium w-18 cursor-pointer"
  >
    Log Out
  </Button>;
};