import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./register.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
export function Register() {
    let navigate = useNavigate();
    let name = useRef();
    let email = useRef();
    let mobile = useRef();
    let password = useRef();
    let confirmPassword = useRef();
    // let { user, isFetching, error, navigate } = useContext(AuthContext);
    async function handleSubmit(event) {
        event.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Confirm password should be same as password!")
            return;
        }
        let user = {
            name: name.current.value,
            email: email.current.value,
            mobile: mobile.current.value,
            password: password.current.value,
        }

        try {
            await axios.post("http://localhost:3200/auth/register", user);
            navigate("/login", { replace: true })
        } catch (error) {
            console.log(error)
        }
        // console.log("Hello World")
        // loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Name" type={"text"} required className="registerInput" ref={name} />
                        <input placeholder="Email" required type={"email"} className="registerInput" ref={email} />
                        <input placeholder="Mobile" required type={"tel"} className="registerInput" ref={mobile} />
                        <input placeholder="Password" minLength={6} required type={"password"} className="registerInput" ref={password} />
                        <input placeholder="Confirm Password" required type={"password"} className="registerInput" ref={confirmPassword} />
                        <button className="registerButton" type={"submit"}>Sign Up</button>
                        {/* <Link to="/register"> */}
                        <button className="LoginButton" type={"button"} onClick={() => navigate("/login", { replace: true })}>
                            Log into Account
                        </button>
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        </div>
    )
}