import { useEffect, useState } from "react";
import { useAuth } from "./Contexts/AuthContext";
import Styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { state, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = state;

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = function (e) {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  return (
    <>
      <div className={Styles.Container}>
        <div className={Styles.center}>
          <form className={Styles.form} onSubmit={handleSubmit}>
            <div className={Styles.flexColumn}>
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name=""
                id="email"
              />
            </div>
            <div className={Styles.flexColumn}>
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                id="password"
              />
            </div>
            <button className={Styles.btn}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
