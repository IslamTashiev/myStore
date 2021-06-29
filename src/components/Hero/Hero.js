import React from "react";
import { useHistory } from "react-router-dom";
import vid from "../../assets/videos/video.mp4";

import classes from "./hero.module.css";

export default function Hero() {
  const history = useHistory();

  return (
    <div className={classes.hero}>
      <video autoPlay loop muted>
        <source src={vid} type="video/mp4" />
      </video>

      <div>
        <h1>BMW</h1>
        <button onClick={() => history.push("/register")} className="btn">
          join
        </button>
      </div>
    </div>
  );
}
