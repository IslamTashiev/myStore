import React from "react";
import userIcon from "../../assets/icons/user.svg";
import loginIcon from "../../assets/icons/login.svg";
import classes from "./auth.module.css";
import { useHistory } from "react-router-dom";

export default function Auth() {
  const history = useHistory();

  return (
    <div className={classes.icons}>
      <img onClick={() => history.push("/")} src={userIcon} />
      <img onClick={() => history.push("/login")} src={loginIcon} />
    </div>
  );
}
