import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { da } from "date-fns/locale";

const CLIENT_ID = "826317445403-moalc5ouhlk90nerham4dvr87tksdlsm.apps.googleusercontent.com";
const LoginGoogle = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Hook chuyển hướng

    const handleSuccess = async (credentialResponse) => {
        console.log("Google login success:", credentialResponse);
        // Assuming the token is in credentialResponse.credential
        const token = credentialResponse.credential; // Get the JWT token
        // Decode the JWT token
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        console.log("Decoded Token:", email);

        try {
            const response = await fetch("http://localhost:8081/logingoogle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }), // Chuyển body thành chuỗi JSON

            });
            const data = await response.json();
            if (response.ok) {

                console.log("dang nhap thanh cong roi do :", data.accessToken);
                const userInfo = jwtDecode(data.accessToken);
                console.log("Role user  :", userInfo.user);
                const role = userInfo.user.role;
                localStorage.setItem("token", JSON.stringify(data)); // Lưu token (nếu có)
                if (role === "admin") {
                    navigate("/Admin/OrderManager");
                }
                else if (role === "employee") {
                    navigate("/Admin/OrderManager");
                }
                else {
                    navigate("/");
                }
            } else {
                // Đăng nhập thất bại
            }
        } catch (err) {
            console.error("Error during login:", err);
        }
        // navigate("/");
        // Now you can use the decoded token as needed
        // For example, send it to your backend
        // fetch("http://localhost:8081/auth/google", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ token }), // Send the original token
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //     if (data.user) {
        //         setUser(data.user); // Save user information
        //     } else {
        //         console.error("Login failed:", data.error);
        //     }
        // })
        // .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Web Bán Hàng</h1>
            <GoogleOAuthProvider clientId="926877859141-sdit8igcbg30v41oq40hc8oitjaq5lug.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={(credentialResponse) => handleSuccess(credentialResponse)} // Pass a function reference
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />;</GoogleOAuthProvider>;
        </div>
    );
};

export default LoginGoogle;
