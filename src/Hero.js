import Styles from "./hero.module.css";
import { NavLink } from "react-router-dom";
export default function Hero() {
  return (
    <div className={Styles.hero}>
      <img src="images/hero.svg" alt="" />
      <div className={Styles.heroText}>
        <div>
          <h1>Keep Notes</h1>
          <p>Your Note Book</p>
        </div>

        <NavLink className={Styles.heroBtn} to="/login">
          Login
        </NavLink>
      </div>
    </div>
  );
}
