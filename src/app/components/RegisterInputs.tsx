"use client";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const RegisterInputs = () => {
  const [registerinputs, setregisterinputs] = useState({
    username: "",
    email: "",
    Password: "",
    confirmPassword: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ): void => {
    setregisterinputs({ ...registerinputs, [name]: e.target.value });
  };
  return (
    <>
    <h1>{registerinputs.username}</h1>
    <h1>{registerinputs.email}</h1>
    <h1>{registerinputs.Password}</h1>
    <h1>{registerinputs.confirmPassword}</h1>
      <Box className="flex flex-col gap-2">
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
          value={registerinputs.Password}
          onChange={(e) => {
            handleChange(e, "Password");
          }}
          id="password"
          label="password"
          variant="outlined"
          maxRows={8}
        />
        <TextField
          value={registerinputs.confirmPassword}
          onChange={(e) => {
            handleChange(e, "confirmPassword");
          }}
          id="confirmPassword"
          label="confirmPassword"
          variant="outlined"
          maxRows={8}
        />
        <Button variant="contained">register</Button>
      </Box>
    </>
  );
};

export default RegisterInputs;
