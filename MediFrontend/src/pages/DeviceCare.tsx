// src/pages/DeviceCare.tsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Droplets, Zap, Thermometer, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { useCurrentPatient } from '../hooks/useCurrentPatient';

interface DeviceCareStep {
  title: string;
  description: string;
}
interface DeviceCareSection {
  section: string;
  steps: DeviceCareStep[];
}

interface RechargingStep {
  step: number;
  title: string;
  description: string;
}
interface RechargingGuide {
  schedule: string;
  steps: RechargingStep[];
}

interface DeviceInfo {
  _id: string;
  name: string;
  device_care: DeviceCareSection[];
  recharging_guide: RechargingGuide;
  // …other fields if you need them
}

export default function DeviceCare() {
  const { patient, loading: patientLoading } = useCurrentPatient();
  const [device, setDevice] = useState<DeviceInfo|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>(undefined);

  useEffect(() => {
    if (!patient) return;
    setLoading(true);
    api
      .get<DeviceInfo>(`/devices/${patient.device_id}`)
      .then((res) => setDevice(res.data))
      .catch((err) => setError(err.message || 'Failed to load device'))
      .finally(() => setLoading(false));
  }, [patient]);

  if (patientLoading || loading) {
    return <div>Loading…</div>;
  }
  if (error || !device) {
    return <div className="text-red-500">Error: {error || 'No device data'}</div>;
  }

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
          <h1 className="text-3xl font-bold">{device.name} Care</h1>
          <p className="text-muted-foreground">Maintenance and care instructions</p>
        </div>
      </div>

      {/* Device Care Sections */}
      {device.device_care.map((section) => (
        <Card key={section.section}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {section.section}
            </CardTitle>
            <CardDescription>{/* you could add a short subtitle here */}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.steps.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* What to Avoid (you can hardcode icons but use your data for descriptions) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            What to Avoid
          </CardTitle>
          <CardDescription>Important precautions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {device.recharging_guide.steps.map((step) => {
              // reuse icons or pick dynamically
              let Icon = Zap;
              if (step.title.toLowerCase().includes('water')) Icon = Droplets;
              if (step.title.toLowerCase().includes('magnetic')) Icon = Zap;
              if (step.title.toLowerCase().includes('temperature')) Icon = Thermometer;
              return (
                <div key={step.step} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recharging Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Recharging Guide
          </CardTitle>
          <CardDescription>{device.recharging_guide.schedule}</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal ml-6 space-y-2">
            {device.recharging_guide.steps.map((step) => (
              <li key={step.step} className="text-sm">
                <span className="font-medium">{step.title}:</span> {step.description}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* …and so on for FAQ or Warning Signs, pulling from device.faq if you added it */}
    </div>
  );
}
