// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import "./profile.css"
import Topbar from "../../Components/topbar/Topbar";
export default function Profile() {
    // let { token, username } = useSelector((state) => state);
    let user = JSON.parse(sessionStorage.getItem("user"));
    let navigate = useNavigate();
    return (
        <>
            <Topbar />
            <div className="user">
                <h2 id="heading">User Details</h2>
                {user && <div className="userDetails">
                    <div>
                        <span className="title">Name</span>
                        <span className="value">{user.name}</span>
                    </div>
                    <div>
                        <span className="title">Email</span>
                        <span className="value">{user.email}</span>
                    </div>
                    <div>
                        <span className="title">Mobile</span>
                        <span className="value">{user.mobile}</span>
                    </div>
                </div>
                }

            </div>
        </>
    )
}