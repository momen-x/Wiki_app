"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import cloude from "../images/cloud.png";
import Button from "@mui/material/Button";
import { useAlertShowHide } from "../Context/AlertContext";

interface IURL {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: IURL[] = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "User", path: "/login", icon: <PersonIcon /> },
  { name: "Article", path: "/article", icon: <ArticleIcon /> },
  { name: "About", path: "/about", icon: <InfoIcon /> },
  { name: "Admin Dashboard", path: "/admindashboard", icon: <DashboardIcon /> },
];

const NavBar = () => {
  const alertContext = useAlertShowHide();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-blue-500 shadow-md">
      <nav className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2"  >
          <Image
            src={cloude}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-white text-lg hidden sm:inline-flex items-center">
            Cloude
            <BiotechOutlinedIcon className="ml-1" fontSize="inherit" />
            Hosting
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6 text-white text-base">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-amber-300 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tablet Navigation (Icons only) */}
        <div className="hidden sm:flex md:hidden items-center space-x-4">
          <ul className="flex items-center space-x-4 text-white">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-amber-300 transition-colors p-2"
                  title={item.name}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Login/Register Buttons */}
        <div className="hidden md:flex items-center space-x-2 gap-2">
          <Button
         
            component={Link}
            href={"/login"}
            variant="outlined"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "4px",
              padding: "6px 16px",
              borderColor: "white",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "white",
              },
            }}
          >
            Login
          </Button>
          <Button
         
            component={Link}
            href={"/register"}
            variant="outlined"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "4px",
              padding: "6px 16px",
              borderColor: "white",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "white",
              },
            }}
          >
            Register
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-blue-600 border-t border-blue-400">
          <ul className="py-4 space-y-2">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Login/Register Buttons */}
          <div className="px-4 pb-4 space-y-2">
            <Button
              component={Link}
              href={"/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              fullWidth
              variant="outlined"
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "4px",
                padding: "8px 16px",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "white",
                },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              href={"/register"}
              onClick={() => setIsMobileMenuOpen(false)}
              fullWidth
              variant="outlined"
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "4px",
                padding: "8px 16px",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "white",
                },
              }}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
