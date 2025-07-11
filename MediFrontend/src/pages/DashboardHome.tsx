// src/pages/dashboard/DashboardHome.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Battery,
  Calendar,
  FileText,
  Settings,
  BookOpen,
  Zap as ZapIcon,
  Bell,
  MessageCircle,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { api } from '../services/api';

interface Patient {
  _id: string;
  name: string;
  email: string;
  device_id: string;
  therapy_id: string;
  implant_date: string;       // e.g. "2023-01-15"
  operational_unit: string;
  // You can extend with battery_status, next_checkup, device_age, alerts, activity, etc.
}

interface DeviceInfo {
  _id: string;
  slug: string;
  type: string;               // new field: e.g. "Spinal Cord Stimulator"
  model: string;              // new field: e.g. "Medtronic Intellis™"
  // later: battery_status, device_age_years, replacement_eta, etc.
}

interface TherapyInfo {
  _id: string;
  name: string;               // e.g. "Spinal Cord Stimulation"
  treatment_info: string;     // your long description
  // later: follow_up_schedule, faq, resources, etc.
}

export default function DashboardHome() {
  const [patient, setPatient]   = useState<Patient | null>(null);
  const [device, setDevice]     = useState<DeviceInfo | null>(null);
  const [therapy, setTherapy]   = useState<TherapyInfo | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    // 1) Load /patients/me, then fetch device & therapy in parallel
    api.get<Patient>('/patients/me')
      .then(({ data: p }) => {
        setPatient(p);
        return Promise.all([
          api.get<DeviceInfo>(`/devices/${p.device_id}`),
          api.get<TherapyInfo>(`/therapies/${p.therapy_id}`),
        ]);
      })
      .then(([devRes, therRes]) => {
        setDevice(devRes.data);
        setTherapy(therRes.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Failed to load dashboard data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading…</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!patient || !device || !therapy) {
    return <div>No dashboard data available.</div>;
  }

  // Calculate device age in years, one decimal
  const implantDate = new Date(patient.implant_date);
  const ageYears = (Date.now() - implantDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  const ageRounded = ageYears.toFixed(1);
  
  // Provide fallbacks for missing data
  const deviceType = device.type || "Medical Device";
  const deviceModel = device.model || "Model Unknown";
  const batteryLevel = "85%"; // TODO: Get from device data when available
  const nextCheckup = "June 28"; // TODO: Get from patient/therapy data when available
  const checkupTimeframe = "In 3 weeks"; // TODO: Calculate from actual date

  return (
    <div className="flex flex-col gap-6">
      {/* Important Alerts */}
      <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Bell className="h-5 w-5" />
            Important Alerts
          </CardTitle>
          <CardDescription>Critical notifications about your device and care</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Battery Alert */}
            <div className="flex items-center gap-4 rounded-lg border border-orange-200 bg-white/50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <Battery className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">Battery Recharge Reminder</p>
                <p className="text-sm text-gray-600">
                  Your device will need recharging in approximately 7 days.
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs">Dismiss</Button>
            </div>
            {/* Appointment Alert */}
            <div className="flex items-center gap-4 rounded-lg border border-green-200 bg-white/50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">Upcoming Appointment</p>
                <p className="text-sm text-gray-600">
                  You have a follow-up appointment scheduled for June 28, 2025.
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Device Type */}
        <Card className="flex flex-col">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Device Type</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-2xl font-bold">{deviceType}</div>
            <p className="text-xs text-muted-foreground">{deviceModel}</p>
          </CardContent>
        </Card>

        {/* Battery Status */}
        <Card className="flex flex-col">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-2xl font-bold">{batteryLevel}</div>
            <p className="text-xs text-muted-foreground">Estimated 7 days until recharge</p>
          </CardContent>
        </Card>

        {/* Next Checkup */}
        <Card className="flex flex-col">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Checkup</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-2xl font-bold">{nextCheckup}</div>
            <p className="text-xs text-muted-foreground">{checkupTimeframe}</p>
          </CardContent>
        </Card>

        {/* Device Age */}
        <Card className="flex flex-col">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Device Age</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-2xl font-bold">{ageRounded} yrs</div>
            <p className="text-xs text-muted-foreground">Implanted {implantDate.toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="space-y-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Device Care */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Device Care</CardTitle>
                  <CardDescription>Maintenance and care instructions</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p>
                    Learn how to properly care for your {device.type} ({device.model}).
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/device-care">
                    <Button>View Details</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Recharging Guide */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Recharging Guide</CardTitle>
                  <CardDescription>How and when to recharge</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p>
                    Step-by-step instructions on recharging your {device.type}.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/recharging">
                    <Button>View Details</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Treatment Info */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Treatment Information</CardTitle>
                  <CardDescription>{therapy.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p>{therapy.treatment_info}</p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/treatment">
                    <Button>View Details</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* AI Assistant */}
              <Card className="flex flex-col border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>Chat with MediMind AI</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p>
                    Get instant answers about your {deviceType}, care instructions, and treatment guidance.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/chatbot">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Chat
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your device usage and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Later: map over patient.activity once you have it stored */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Battery className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Device Recharged</p>
                      <p className="text-xs text-muted-foreground">June 1, 2025 at 9:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Settings className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Settings Adjusted</p>
                      <p className="text-xs text-muted-foreground">May 28, 2025 at 2:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Treatment Program Updated</p>
                      <p className="text-xs text-muted-foreground">May 15, 2025 at 11:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
