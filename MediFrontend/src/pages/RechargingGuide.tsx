// src/pages/RechargingGuide.tsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Battery, Clock, Zap, Timer, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

import { api } from '../services/api';
import { useCurrentPatient } from '../hooks/useCurrentPatient';

interface RechargingStep {
  step: number;
  title: string;
  description: string;
}
interface RechargingGuideData {
  schedule: string;
  steps: RechargingStep[];
}

interface DeviceInfo {
  _id: string;
  name: string;
  recharging_guide: RechargingGuideData;
  // you can extend with duration, current_status, etc.
}

export default function RechargingGuide() {
  const { patient, loading: patientLoading } = useCurrentPatient();
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!patient) return;
    setLoading(true);
    api
      .get<DeviceInfo>(`/devices/${patient.device_id}`)
      .then(res => setDevice(res.data))
      .catch(err => setError(err.message || 'Failed to load device'))
      .finally(() => setLoading(false));
  }, [patient]);

  if (patientLoading || loading) {
    return <div>Loading…</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!device) {
    return <div>No device found.</div>;
  }

  const { schedule, steps } = device.recharging_guide;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{device.name} Recharging Guide</h1>
          <p className="text-muted-foreground">Complete guide for recharging your device</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Recharge Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schedule}</div>
            <p className="text-xs text-muted-foreground">
              Based on your device’s recommended schedule
            </p>
          </CardContent>
        </Card>

        {/* Placeholder: you can extend your schema to include duration/current_status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Charge Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Not configured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Battery className="h-4 w-4" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Not available</p>
          </CardContent>
        </Card>
      </div>

      {/* Step-by-Step Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Step-by-Step Recharging Process
          </CardTitle>
          <CardDescription>
            Follow these steps for safe and effective charging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Charge in a comfortable, relaxed position</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Use the same time each week for consistency</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep charging equipment clean and dry</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Charge before battery drops below 20%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Always use the original charging equipment</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium">Charger won't start</h4>
                <p className="text-muted-foreground">Check paddle position and ensure all connections are secure</p>
              </div>
              <div>
                <h4 className="font-medium">Charging is slow</h4>
                <p className="text-muted-foreground">Verify paddle alignment and remove any barriers between paddle and device</p>
              </div>
              <div>
                <h4 className="font-medium">Unusual sensations</h4>
                <p className="text-muted-foreground">Stop charging and contact your healthcare provider if sensations are uncomfortable</p>
              </div>
              <div>
                <h4 className="font-medium">Equipment damage</h4>
                <p className="text-muted-foreground">Never use damaged equipment. Contact your provider for replacement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charging Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Charging Schedule</CardTitle>
          <CardDescription>Maintain optimal battery life with this schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Weekly Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 border rounded">
                  <span>Sunday</span>
                  <span className="font-medium text-blue-600">Charging Day</span>
                </div>
                <div className="flex justify-between p-2 border rounded">
                  <span>Monday - Saturday</span>
                  <span className="text-muted-foreground">Monitor battery level</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Battery Alerts</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 border rounded">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>80-100%: Optimal</span>
                </div>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>20-79%: Good</span>
                </div>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Below 20%: Charge Now</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
