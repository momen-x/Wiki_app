"use client";
import axios from "axios";
import React, { useState } from "react";
import { domin_name } from "../utils/DOMIN";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

const LogOutPage = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const logoutClick = async () => {
    try {
      await axios.get(`${domin_name}/api/users/logout`);

      router.push("/login");
      router.refresh();
    } catch (error) {
      setError("Can't log out now. Please check your internet connection.");
    }
  };

  return (
    <>
      <button
        onClick={logoutClick}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
      >
        Log Out
      </button>
      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default LogOutPage;
