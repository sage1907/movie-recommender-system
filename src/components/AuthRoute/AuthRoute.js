import React from "react";
import LoginPage from "../Users/Forms/LoginPage";

const AuthRoute = ({ children }) => {
  //get user from localstorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn) return <LoginPage />;
  return <>{children}</>;
};

export default AuthRoute;