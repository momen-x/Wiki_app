"use client";
import { TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginInput = () => {
  interface IInput {
    email: string;
    password: string;
  }
  const [loginInputs, setLoginInputs] = useState({ email: "", Password: "" });
  
  const router=useRouter();
  return (
    <>
      <Box className="flex flex-col gap-2">
        <TextField
          value={loginInputs.email}
          id="email"
          label="email"
          variant="outlined"
          maxRows={8}
          onChange={(e) => {
            setLoginInputs({ ...loginInputs, email: e.target.value });
          }}
        />
        <TextField
          value={loginInputs.Password}
          onChange={(e) => {
            setLoginInputs({ ...loginInputs, Password: e.target.value });
          }}
          id="password"
          label="password"
          variant="outlined"
          maxRows={8}
        />
        <Button variant="contained" onClick={()=>{router.replace('/')}}>Login</Button>
      </Box>
    </>
  );
};

export default LoginInput;
