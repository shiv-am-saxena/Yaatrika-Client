import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TermsAndConditions from '../pages/TermsAndConditions'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import { Login } from '../components/LoginForm'
import { Signup } from '../components/SignupForm'
import Home from '../pages/Home'
import Auth from '../config/Auth';
import AuthPage from '../pages/AuthPage'
import Profile from '../pages/Profile'
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Signup />} />
                {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
            </Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
    )
}