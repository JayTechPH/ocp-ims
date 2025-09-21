import { div } from 'prelude-ls';
import './loginPanel.css'
import { useState } from "react";


const LoginPanel = ({ isLogin }) => {
    return (
        <div className="login-container">
            <div className="background">
                <div className="login-bg"></div>
                <div className="login-img"></div>
            </div>
            <div className="login-front">
                <div className="login-logo">
                    <img src="/img/logo.png" />
                </div>
                <div className="login-title">
                    <h2>CALOOCAN OFFICE OF THE CITY PROSECUTOR</h2>
                    <hr />
                </div>
            </div>
            <div className="login-box">
                <div className="username-login">
                    <img src="/icons/user.png" alt="" />
                    <input type="text" placeholder="Username" />
                </div>

                <div className="password-login">
                    <img src="/icons/padlock.png" alt="" />
                    <input type="text" placeholder="Password" />
                </div>


                <div className="login-option">
                    <input type="checkbox" />
                    <label htmlFor="agree">Remember ID</label>
                    <a href="#">Forgot Password</a>
                </div>


                <div className="login-btn">
                    <button type="button" onClick={isLogin}>Login In</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPanel;