"use client";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { domin_name } from "../utils/DOMIN";

const RegisterInputs = () => {
  const [registerinputs, setregisterinputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ): void => {
    setregisterinputs({ ...registerinputs, [name]: e.target.value });
  };

  const registerAcount = async () => {
    if (
      registerinputs.password.trim() === "" ||
      registerinputs.confirmPassword.trim() == "" ||
      registerinputs.email.trim() === "" ||
      registerinputs.username.trim() === ""
    ) {
      setError("Please fill in all fields");
      return;
    }
    if (registerinputs.password !== registerinputs.confirmPassword) {
      setError("the password is not mathch");
      return;
    }
    if (!registerinputs.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${domin_name}/api/users/register`,
        registerinputs
      );
      if (response.data) {
        router.replace("/");
        router.refresh();
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Invalid email or password");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("register failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerAcount();
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        <TextField
          value={registerinputs.username}
          id="username"
          label="username"
          variant="outlined"
          maxRows={8}
          onChange={(e) => {
            handleChange(e, "username");
          }}
        />
        <TextField
          value={registerinputs.email}
          id="email"
          label="email"
          variant="outlined"
          maxRows={8}
          onChange={(e) => {
            handleChange(e, "email");
          }}
        />
        <TextField
          type="password"
          value={registerinputs.password}
          onChange={(e) => {
            handleChange(e, "password");
          }}
          id="password"
          label="password"
          variant="outlined"
          maxRows={8}
        />
        <TextField
          type="password"
          value={registerinputs.confirmPassword}
          onChange={(e) => {
            handleChange(e, "confirmPassword");
          }}
          id="confirmPassword"
          label="confirmPassword"
          variant="outlined"
          maxRows={8}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          onClick={registerAcount}
        >
          {loading ? "Registerd..." : "register"}
          register
        </Button>
      </Box>
    </>
  );
};

export default RegisterInputs;
