import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CuadrillaIncidentsPage from '../pages/CuadrillaIncidentsPage';
import IncidentDetailPage from '../pages/IncidentDetailPage';
import AuthRequiredWrapper from '../components/router/AuthRequiredWrapper';
// import { municipalPages } from '../config/pages.config';

import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';

const ContentRoutes: React.FC = () => {
    return (
        <Routes>

            <Route path="/login" element={<LoginPage />} />

            {/* Privadas */}
            <Route element={<AuthRequiredWrapper />}>
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/cuadrilla/incidencias" element={<CuadrillaIncidentsPage />} />
                    <Route path="/cuadrilla/incidencias/:id" element={<IncidentDetailPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};


export default ContentRoutes;
