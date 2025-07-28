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
    <div className="hidden md:flex items-center space-x-2 gap-2">
      {payload ? (
        <>
          <strong className="text-amber-50">{username}</strong>
          <LogOutPage />
        </>
      ) : (
        <>
          <Button
            component={Link}
            href="/login"
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
            href="/register"
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
        </>
      )}
    </div>
  );
};
