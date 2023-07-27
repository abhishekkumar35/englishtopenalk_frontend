import Home from "./Home";
import { ErrorBoundary } from "react-error-boundary";
import { useGoogleAuth } from "../services/firebaseAuthServiceHook";
import Logout from "./Logout";
const Login = () => {
  const { errorMessage, isLogin, handleLogin } = useGoogleAuth();
  console.log("login comp", isLogin);
  // console.log(localStorage.getItem("auth"));

  if (!isLogin) {
    return (
      <ErrorBoundary FallbackComponent={<h1>Some Error Occured</h1>}>
        <button style={{ marginTop: "100px" }} onClick={handleLogin}>
          Google Login
        </button>
      </ErrorBoundary>
    );
  } else if (isLogin) {
    return (
      <Home>
        <Logout />
      </Home>
    );
  } else if (errorMessage.length !== 0) {
    return <p>Something Went Wrong</p>;
  }
};
export default Login;
