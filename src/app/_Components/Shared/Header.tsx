import React from 'react'
import Link from "next/link";
import Image from "next/image";
import wikiLogo from "@/app/images/wikiLogo.png";
import { MobileMenu } from "@/app/_Components/Shared/MobileMenu";
import { AuthButtons } from "@/app/_Components/Shared/AuthButtons";
import { ModeToggleBtn } from "../../(Modules)/_Theme/components/ToggleModBtn";
import { HomeIcon, Info, LayoutDashboard, Newspaper } from "lucide-react";
import auth from "@/auth";

interface IURL {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const basePages: IURL[] = [
  { name: "Home", path: "/", icon: <HomeIcon size={18} /> },
  { name: "Article", path: "/article", icon: <Newspaper size={18} /> },
  { name: "About", path: "/about", icon: <Info size={18} /> },
];

const Header = async () => {
  const pages = [...basePages];
  // verification
  const session = await auth();
  const isAdmin = session?.user.isAdmin;

  if (isAdmin) {
    if (!pages.some((p) => p.name === "Admin Dashboard")) {
      pages.push({
        name: "Admin Dashboard",
        path: "/admindashboard",
        icon: <LayoutDashboard size={18} />,
      });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-lg   flex items-center justify-center">
                <Image
                  src={wikiLogo}
                  alt="Cloud Hosting Logo"
                  width={32}
                  height={32}
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Wiki
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <span className="text-gray-500 dark:text-gray-400">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ModeToggleBtn />
            </div>

            {/* Auth Buttons */}
            <AuthButtons
              payload={session}
              username={session?.user?.name || session?.user.username || ""}
            />

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-3">
              <ModeToggleBtn />
              <MobileMenu pages={pages} payload={session} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;