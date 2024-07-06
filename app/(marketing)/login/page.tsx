"use client";
import React, { useState } from "react";
import { LoginPage } from "@vivekkv178/library";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { onLoginSuccess } from "@/lib/reducers/auth";

const Login = () => {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const signInHandler = (user: any) => {
    dispatch(onLoginSuccess(user));
    router.push(FE_ROUTES.HOME);
  };

  return (
    <div>
      <LoginPage
        NavigationComponent={Link}
        signInHandler={signInHandler}
        signUpHandler={() => {}}
      />
    </div>
  );
};

export default Login;
