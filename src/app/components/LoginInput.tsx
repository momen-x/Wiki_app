"use client";
import { TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { domin_name } from "../utils/DOMIN";

interface IInput {
  email: string;
  password: string;
}

const LoginInput = () => {
  console.log("domine_name is : ", domin_name);

  
  const [loginInputs, setLoginInputs] = useState<IInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const loginClick = async () => {
    if (!loginInputs.email || !loginInputs.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!loginInputs.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("domine ??????? ",domin_name);
      
      const response = await axios.post(
        `${domin_name}/api/users/login`,
        loginInputs
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
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginClick();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <TextField
        value={loginInputs.email}
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        disabled={loading}
        onChange={(e) => {
          setLoginInputs({ ...loginInputs, email: e.target.value });
          // Clear error when user starts typing
          if (error) setError("");
        }}
      />

      <TextField
        value={loginInputs.password}
        onChange={(e) => {
          setLoginInputs({ ...loginInputs, password: e.target.value });
          // Clear error when user starts typing
          if (error) setError("");
        }}
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        disabled={loading}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};

export default LoginInput;
