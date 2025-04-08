import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Auth from './components/Auth/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ShiftRegistration from './pages/ShiftRegistration';
import MyShifts from './pages/MyShifts';
import Feedback from './pages/Feedback';
import AttendanceReport from './pages/Admin/AttendanceReport';
import AdminDashboard from './pages/Admin/Dashboard';
import DoctorsManagement from './pages/Admin/DoctorsManagement';
import ShiftManagement from './pages/Admin/ShiftManagement';
import SystemSettings from './pages/Admin/SystemSettings';
import Notifications from './pages/Notifications';
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import AIServices from './pages/AI-Services';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Products from './pages/Products';
import Features from './pages/Features';
import AboutUs from './pages/AboutUs';
import AboutMe from "./pages/AboutMe";
import AboutMeFa from "./pages/AboutMeFa";
import NotFound from "./pages/NotFound";
import { CircularProgress, Box } from '@mui/material';
const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && user.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return user.role === 'admin' ? (
        <AdminLayout>{children}</AdminLayout>
    ) : (
        <Layout>{children}</Layout>
    );
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ai-services" element={<AIServices />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/features" element={<Features />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/aboutme/fa" element={<AboutMeFa />} />
            <Route path="*" element={<NotFound />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoute requireAdmin={true}>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/doctors"
                element={
                    <PrivateRoute requireAdmin={true}>
                        <DoctorsManagement />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/shifts"
                element={
                    <PrivateRoute requireAdmin={true}>
                        <ShiftManagement />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/attendance"
                element={
                    <PrivateRoute requireAdmin={true}>
                        <AttendanceReport />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/settings"
                element={
                    <PrivateRoute requireAdmin={true}>
                        <SystemSettings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/shift-registration"
                element={
                    <PrivateRoute>
                        <ShiftRegistration />
                    </PrivateRoute>
                }
            />
            <Route
                path="/my-shifts"
                element={
                    <PrivateRoute>
                        <MyShifts />
                    </PrivateRoute>
                }
            />
            <Route
                path="/feedback"
                element={
                    <PrivateRoute>
                        <Feedback />
                    </PrivateRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <PrivateRoute>
                        <Notifications />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;