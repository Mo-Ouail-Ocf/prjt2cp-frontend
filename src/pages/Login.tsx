import styles from "../components/homecomponent/login.module.css";
import LogoB from "../images/logoblanc.png";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { v1AuthClient } from "../apiClient/index.ts";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

  const auth = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const authData = {
        grant_type: "authorization_code",
        code: codeResponse.code,
        redirect_uri: "http://localhost:3000"
      }

      v1AuthClient.tokenV1AuthTokenPost(authData).then(response => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/");
        navigate(0);
      }).catch(error => {
          console.log("Login Failed:", error);
        })
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  const login = () => {
      const loginData = {
        username: email.match(/^([^@]*)@/)[1],
        password: password,
      }

      v1AuthClient.loginV1AuthLoginPost(loginData).then(response => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/");
        navigate(0);
      }).catch(error => {
          console.log("Login Failed:", error);
        })
  }

  return (
    <>
      <div className={styles.complet}>
        <div className={styles.imagecontainer}>
          <img className={styles.image} src={LogoB} alt="Logo" />
        </div>
        <div className={styles.formulaire}>
          <form action="" onSubmit={e => e.preventDefault()}>
            <legend className={styles.titre}>Sign in to Tikta</legend>
            <label htmlFor="email"></label>
            <input
              className={styles.email}
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <label htmlFor="mdp"></label>
            <input
              className={styles.password}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
            <button type="submit" className={styles.login} onClick={login}>Login</button>
            <button type="button" onClick={auth} className={styles.google}>
              Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
