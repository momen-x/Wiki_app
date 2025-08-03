"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { createPortal } from "react-dom";
import LogOutPage from "../logout/page";

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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-blue-600 shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {pages.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center space-x-4 px-6 py-4 text-white hover:bg-blue-700 transition-colors duration-200 border-b border-blue-500/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          <div className="px-6 py-4 border-t border-blue-500">
            {payload ? (
              <div className="space-y-4">
                <div className="font-medium bg-sky-300 w-2xs  rounded-2xl p-3 text-black hover:bg-amber-50 ">
                  <Link
                    href={"/profile"}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {payload.username}
                  </Link>
                </div>
                <LogOutButton onLogout={() => setIsMobileMenuOpen(false)} />
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  component={Link}
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  sx={{
                    marginBottom: "15px",
                    textTransform: "none",
                    fontWeight: "600",
                    borderRadius: "8px",
                    padding: "12px 16px",
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
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: "600",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    backgroundColor: "white",
                    color: "#3b82f6",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
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
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white p-2 hover:bg-blue-600 rounded-lg transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <MenuIcon />
      </button>

      {/* Render mobile menu using portal */}
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
};

const LogOutButton = ({ onLogout }: { onLogout: () => void }) => {
  return <LogOutPage />;
};
