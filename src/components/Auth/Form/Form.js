import React from "react";
import classes from "./form.module.css";
import userIcon from "../../../assets/icons/user2.svg";

export default function Form({ title }) {
  return (
    <div className={classes.contact_form}>
      <h1>{title}</h1>
      <img src={userIcon} />
      <form>
        <input type="text" name="email" placeholder="test@gmail.com" required />
        <input type="text" name="password" placeholder="Password" required />
        <button className={classes.btn}>{title}</button>
      </form>
    </div>
  );
}
