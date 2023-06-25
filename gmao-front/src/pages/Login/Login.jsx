import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { SERVER_API_CONFIG } from "./../../Configurations";
const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };
  const handleSignIn = async () => {
    const response = await fetch(`${URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });
    if (response.ok) {
      const responseJson = await response.json();
      if (responseJson.token) {
        localStorage.setItem("Token", responseJson.token);
        localStorage.setItem("UserType", responseJson.UserType);
        notify(false, "Logged In");
        navigate(0);
      }
    } else {
      console.log("here");
      notify(true, "Couldn't log in with provided credentials");
    }
  };
  return (
    <div className="LoginPage">
      <div className="Container d-flex flex-row container  ">
        <div className="Left"></div>
        <div className="Right">
          <h1>Login</h1>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
            className="min-h-[50px]"
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
            className="min-h-[50px]"
          />
          <Button className="min-h-[50px] min-w-full" onClick={handleSignIn}>
            Log in
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
