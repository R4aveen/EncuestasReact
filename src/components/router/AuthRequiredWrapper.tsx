import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AuthRequiredWrapper: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const [checking, setChecking] = useState(true);
    const [backendAlive, setBackendAlive] = useState(true);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const base = API_URL.replace(/\/$/, "");
                await axios.get(`${base}/health/`);
                setBackendAlive(true);
            } catch (error) {
                console.error("Backend muerto:", error);
                setBackendAlive(false);
                logout();
            } finally {
                setChecking(false);
            }
        };

        checkBackend();
    }, [logout]);

    if (checking) return null;

    if (!isAuthenticated || !backendAlive) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AuthRequiredWrapper;
