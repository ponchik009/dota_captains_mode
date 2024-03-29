import React from "react";

import styles from "./Login.module.css";

import { ReactComponent as IconSteam } from "../../assets/icons/IconSteam.svg";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../const/env";

export const Login = () => {
  const { user } = React.useContext(UserContext);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page">
      <a href={`${API_URL}/auth/login`} className={styles.loginInButton}>
        <button>
          <IconSteam />
          Log in with Steam
        </button>
      </a>
    </div>
  );
};
