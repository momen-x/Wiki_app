"use client";

import Button from "@mui/material/Button";
import Link from "next/link";
import LogOutPage from "../logout/page";

interface AuthButtonsProps {
  payload: any;
  username: string | null;
}

export const AuthButtons = ({ payload, username }: AuthButtonsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-3">
      {payload ? (
        <div className="flex items-center space-x-3">
          <div className="text-amber-50 font-medium">
            {/* <span className="hidden lg:inline">Welcome, </span> */}
            <Link href={"/profile"}>
              <span className="truncate max-w-[120px] cursor-pointer">
                {username}
              </span>
            </Link>
          </div>
          <LogOutPage />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button
            component={Link}
            href="/login"
            variant="outlined"
            size="small"
            color="inherit"
            sx={{
              margin: "5px",
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "0.875rem",
              borderColor: "white",
              color: "white",
              minWidth: "auto",
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
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "0.875rem",
              backgroundColor: "white",
              color: "#3b82f6",
              minWidth: "auto",
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
  );
};
