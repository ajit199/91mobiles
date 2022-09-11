// import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Pages/home/Home";
import { Login } from "../Pages/login/Login";
import { Register } from "../Pages/register/Register";
import UploadDocument from "../Pages/uploadDocument/UploadDocument";
import Profile from "../Pages/profile/Profile";
import ViewDocument from "../Pages/viewDocument/ViewDocument";
// import { Home } from "../pages/home/Home";
// import { Messanger } from "../pages/messanger/Messanger";
// import { Profile } from "../pages/profile/Profile";

export function MainRoutes() {
    // let { user } = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/uploadDocument" element={<UploadDocument />} />
                <Route path="/viewDocument/:fileName" element={<ViewDocument />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}