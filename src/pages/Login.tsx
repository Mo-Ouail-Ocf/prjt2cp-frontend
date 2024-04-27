import styles from "../component/homecomponent/login.module.css";
import LogoB from "../images/logoblanc.png";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FormData from "form-data";

const login = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  useEffect(() => {
    if (user) {
      const formData = new FormData();
      formData.append("code", user.code);
      formData.append("redirect_uri", "http://localhost:3000");

      axios
        .post(`http://localhost:8000/token`, formData, {
          headers: {
            //'Content-Type': 'text/plain',
            Authorization: `Bearer ${user.code}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <>
      <div className={styles.complet}>
        <div className={styles.imagecontainer}>
          <img className={styles.image} src={LogoB} alt="Logo" />
        </div>
        <div className={styles.formulaire}>
          <form action="">
            <legend className={styles.titre}>Sign in to Tikta</legend>
            <label htmlFor="email"></label>
            <input
              className={styles.email}
              type="email"
              id="email"
              name="email"
              placeholder="email"
            />
            <label htmlFor="mdp"></label>
            <input
              className={styles.password}
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
            <button className={styles.login}>Login</button>
            <button onClick={login} className={styles.google}>
              Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
