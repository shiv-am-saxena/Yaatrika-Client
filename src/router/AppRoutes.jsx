import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import { Login } from '../components/LoginForm';
import { Signup } from '../components/SignupForm';
import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import { CaptainSignup } from '../components/CaptainForm';

import UserHome from '../pages/user/userHome';
import CaptainHome from '../pages/captain/CaptainHome';
import RidePanel from '../pages/user/RidePanel';

import ProtectedRoute from './ProtectedRoutes'; // ✅ Ensure correct filename
import Profile from '../pages/user/Profile';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            {/* Auth Routes */}
            <Route path="/auth" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="user/register" element={<Signup />} />
                <Route path="captain/register" element={<CaptainSignup />} />
            </Route>

            {/* Protected Routes for Users */}
            <Route path="/user" element={<ProtectedRoute />}>
                <Route path="home" element={<UserHome />} />
                <Route path="ride" element={<RidePanel />} />
                <Route path="profile" element={<Profile/>}/>
            </Route>

            {/* Protected Routes for Captains */}
            <Route path="/captain" element={<ProtectedRoute />}>
                <Route path="home" element={<CaptainHome />} />
            </Route>
        </Routes>
    );
}
