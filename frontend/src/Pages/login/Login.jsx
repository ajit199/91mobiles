import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./login.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
export function Login() {
    let navigate = useNavigate();
    let email = useRef();
    let password = useRef();
    async function handleSubmit(event) {
        event.preventDefault();
        let user = {
            email: email.current.value,
            password: password.current.value,
        }
        try {
            await axios.post("http://localhost:3200/auth/login", user)
                .then((res) => {
                    sessionStorage.setItem("user", JSON.stringify(res.data.data))
                    navigate("/", { replace: true })
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" required type={"email"} className="loginInput" ref={email} />
                        <input placeholder="Password" minLength={6} required type={"password"} className="loginInput" ref={password} />
                        <button className="loginButton" type={"submit"}>Log In</button>
                        {/* <Link to="/login"> */}
                        <button className="loginRegisterButton" onClick={() => {
                            navigate("/register");
                        }}>
                            Create a New Account
                        </button>
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        </div>
    )
}