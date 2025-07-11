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
import DeviceCare from './pages/DeviceCare';
import RechargingGuide from './pages/RechargingGuide';
import TreatmentInformation from './pages/TreatmentInformation';
import Chatbot from './pages/Chatbot';
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
              path="/device-care"
              element={<PrivateRoute><DeviceCare /></PrivateRoute>}
            />
            <Route
              path="/recharging-guide"
              element={<PrivateRoute><RechargingGuide /></PrivateRoute>}
            />
            <Route
              path="/treatment-information"
              element={<PrivateRoute><TreatmentInformation /></PrivateRoute>}
            />
            <Route
              path="/chatbot"
              element={<PrivateRoute><Chatbot /></PrivateRoute>}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute><DashboardLayout /></PrivateRoute>}
            >
              <Route index element={<DashboardHome />} />
              <Route path="device-care" element={<DeviceCare />} />
              <Route path="recharging" element={<RechargingGuide />} />
              <Route path="treatment" element={<TreatmentInformation />} />
              <Route path="chatbot" element={<Chatbot />} />
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