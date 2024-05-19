import { useGoogleLogin } from "@react-oauth/google";
import { v1AuthClient } from "../apiClient/index.ts";
import img from "../images/logo.svg";
import "./Login logo/Brain.css";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();

  const auth = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const authData = {
        grant_type: "authorization_code",
        code: codeResponse.code,
        redirect_uri: "http://localhost:3000",
      };

      v1AuthClient
        .tokenV1AuthTokenPost(authData)
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          navigate("/inbox");
          navigate(0);
        })
        .catch((error) => {
          console.log("Login Failed:", error);
        });
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  return (
    <>
      <div className="grid hey w-full h-full grid-cols-3 grid-rows-3 relative min-h-[100vh] ">
        <div
          className="  flex justify-center items-center col-start-2 col-end-3 row-start-2 row-end-3 relative cursor-pointer  "
          onClick={auth}
        >
          <img
            src={img}
            alt="Logo "
            className="h-[185px] overflow-hidden w-[350px]"
          />
          <div className="Brain absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]  "></div>
        </div>
        <div className="col-start-2 col-end-3 row-start-3   self-center text-center">
          <h1 className="welcome-text " style={{ color: "#3b82f6" }}>
            Welcome to our page! We're delighted to have you here!
          </h1>
          <p className="click-message animated m-4" style={{ color: "#3b82f6" }}>
            Please click on our S-Brain  to log in.
          </p>
        </div>
      </div>

      {/* LOGO */}
      {/* </div> */}
    </>
  );
};

export default login;
