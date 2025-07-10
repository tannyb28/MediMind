// src/pages/dashboard/DashboardHome.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Battery, Calendar, FileText, Settings, BookOpen, Zap } from 'lucide-react';
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

const SCS_ID = '686fe97a7679d49d194e4aa0';
const DBS_ID = '68702ada7679d49d194e4aad';

export default function DashboardHome() {
  const [therapyId, setTherapyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/patients/me')
      .then(res => setTherapyId(res.data.therapy_id))
      .catch(() => setTherapyId(null))
      .finally(() => setLoading(false));
  }, []);

  let deviceType = 'Spinal Cord Stimulator';
  let deviceModel = 'Medtronic Intellis™';
  let therapyDescription = 'Comprehensive information about spinal cord stimulation therapy, how it works, and what to expect.';
  if (therapyId === DBS_ID) {
    deviceType = 'Deep Brain Stimulator';
    deviceModel = 'Medtronic Percept™ PC';
    therapyDescription = 'Comprehensive information about deep brain stimulation therapy, how it works, and what to expect.';
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Summary Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Device Type</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceType}</div>
            <p className="text-xs text-muted-foreground">{deviceModel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Estimated 7 days until recharge</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Checkup</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">June 28</div>
            <p className="text-xs text-muted-foreground">In 3 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Device Age</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5 years</div>
            <p className="text-xs text-muted-foreground">Replacement in ~7 years</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="space-y-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Device Care</CardTitle>
                <CardDescription>Maintenance and care instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Learn how to properly care for your spinal cord stimulator to ensure optimal performance and longevity.</p>
              </CardContent>
              <CardFooter>
                <Link to="/device-care">
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recharging Guide</CardTitle>
                <CardDescription>How and when to recharge</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Step-by-step instructions on recharging your device, including frequency and best practices.</p>
              </CardContent>
              <CardFooter>
                <Link to="/recharging-guide">
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Treatment Information</CardTitle>
                <CardDescription>About your therapy</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{therapyDescription}</p>
              </CardContent>
              <CardFooter>
                <Link to="/treatment-information">
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>

            </div>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Important Alerts</CardTitle>
                  <CardDescription>Notifications about your device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                        <Battery className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Battery Recharge Reminder</p>
                        <p className="text-sm text-muted-foreground">
                          Your device will need recharging in approximately 7 days.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Dismiss</Button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Upcoming Appointment</p>
                        <p className="text-sm text-muted-foreground">
                          You have a follow-up appointment scheduled for June 28, 2025.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your device usage and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
