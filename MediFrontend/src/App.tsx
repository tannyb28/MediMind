import React, { type JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Devices from './pages/Devices';
import DashboardLayout from './layout/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import { Placeholder } from './pages/Placeholder';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/devices"
              element={<PrivateRoute><Devices /></PrivateRoute>}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute><DashboardLayout /></PrivateRoute>}
            >
              <Route index element={<DashboardHome />} />
              <Route path="device-care" element={<Placeholder title="Device Care" />} />
              <Route path="recharging" element={<Placeholder title="Recharging Guide" />} />
              <Route path="treatment" element={<Placeholder title="Treatment Info" />} />
              <Route path="replacement" element={<Placeholder title="Replacement Timeline" />} />
              <Route path="faq" element={<Placeholder title="FAQ" />} />
              <Route path="resources" element={<Placeholder title="Resources" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}