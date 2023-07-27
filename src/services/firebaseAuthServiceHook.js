import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState, useEffect } from "react";
export const useGoogleAuth = () => {
  const [isLogin, setIsLogin] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  console.log("isLogin in google auth", isLogin);
  const [firebaseStateChange, setFirebaseStateChange] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [isLogOut, setIsLogout] = useState(true);
  const [errorMessage, setError] = useState("");
  const [jwttoken, setToken] = useState("");
  const auth = getAuth();
  const handleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((userCredential) => {
        const token = userCredential.user.accessToken;
        setToken(token);
        if (token) {
          setFirebaseStateChange(true);
          setIsLogout(false);
          window.localStorage.setItem("auth", true);
        } else {
          setFirebaseStateChange(false);
          window.localStorage.removeItem("auth");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLogin(false);
        setIsLogout(true);
        setError(`${errorCode} + "  " + ${errorMessage}`);
        window.localStorage.removeItem("auth");
      });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("hello");
        setIsLogout(true);
        window.localStorage.removeItem("auth");
        setIsLogin(false);
        setFirebaseStateChange(false);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (firebaseStateChange === true) {
      setIsLogin(true);
      setIsLogout(false);
    } else {
      setIsLogin(false);
      setIsLogout(true);
    }
    console.log("islogout", isLogOut);
    console.log("islogin", isLogin);
  }, [jwttoken, firebaseStateChange]);

  return { isLogin, errorMessage, handleLogin, jwttoken, logout };
};
