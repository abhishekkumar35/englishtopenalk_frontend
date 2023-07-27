import React from "react";
import { useGoogleAuth } from "../services/firebaseAuthServiceHook";
const Logout = () => {
  const { logout } = useGoogleAuth();
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
