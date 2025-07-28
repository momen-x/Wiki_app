"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";


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

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="sm:hidden text-white p-2"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

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

          <div className="px-4 pb-4 space-y-2">
            {payload ? (
              <LogOutButton />
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
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
                  href="/register"
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const LogOutButton = () => {
  // Your logout implementation here
  return <div>Logout Button</div>;
};