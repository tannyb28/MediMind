// src/pages/dashboard/TreatmentInformation.tsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Brain, Zap, Target, TrendingUp, Calendar, Users } from 'lucide-react';
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

interface Patient {
  therapy_id: string;
}

interface Expectation {
  phase: string;
  description: string;
}

interface TherapyInfo {
  _id: string;
  device_slug: string;
  name: string;
  overview: string;
  how_it_works: string[];
  benefits: string[];
  limitations: string[];
  expectations: Expectation[];
}

const SCS_ID = '686fe97a7679d49d194e4aa0';
const DBS_ID = '68702ada7679d49d194e4aad';

export default function TreatmentInformation() {
  const [therapyId, setTherapyId] = useState<string | null>(null);
  const [therapy, setTherapy] = useState<TherapyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Patient>('/patients/me')
      .then(res => {
        const id = res.data.therapy_id;
        setTherapyId(id);
        return api.get<TherapyInfo>(`/therapies/${id}`);
      })
      .then(res => setTherapy(res.data))
      .catch(err => setError(err.message || 'Failed to load therapy data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }
  if (!therapyId || !therapy) {
    return <div className="p-6">Therapy information not found.</div>;
  }

  const isDBS = therapyId === DBS_ID;
  const title = isDBS ? 'Deep Brain Stimulation' : 'Spinal Cord Stimulation';
  const subtitle = isDBS
    ? 'Understanding your deep brain stimulation therapy'
    : 'Understanding your spinal cord stimulation therapy';

  // static shared content
  const SCSContent = (
    <>
      {/* Treatment Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Treatment Goals
          </CardTitle>
          <CardDescription>What we aim to achieve with your therapy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Pain Reduction</h4>
              <p className="text-sm text-muted-foreground">50-70% reduction in chronic pain levels</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Improved Function</h4>
              <p className="text-sm text-muted-foreground">Better mobility and daily activities</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Quality of Life</h4>
              <p className="text-sm text-muted-foreground">Enhanced sleep, mood, and overall wellbeing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How Your Device Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            How Your Device Works
          </CardTitle>
          <CardDescription>Technical details about your system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-3">System Components</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <span className="font-medium">Implantable Pulse Generator (IPG):</span>
                      <span className="text-muted-foreground ml-1">Battery-powered device that generates electrical impulses</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <span className="font-medium">Leads:</span>
                      <span className="text-muted-foreground ml-1">Thin wires with electrodes that deliver stimulation</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <span className="font-medium">Remote Control:</span>
                      <span className="text-muted-foreground ml-1">Device to adjust settings and turn therapy on/off</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Stimulation Programs</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded">
                    <span className="font-medium">Program 1:</span>
                    <span className="text-muted-foreground ml-2">Low back coverage</span>
                  </div>
                  <div className="p-3 border rounded">
                    <span className="font-medium">Program 2:</span>
                    <span className="text-muted-foreground ml-2">Leg pain coverage</span>
                  </div>
                  <div className="p-3 border rounded">
                    <span className="font-medium">Program 3:</span>
                    <span className="text-muted-foreground ml-2">Combination therapy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Expect & Activity Guidelines */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* What to Expect */}
        <Card>
          <CardHeader>
            <CardTitle>What to Expect</CardTitle>
            <CardDescription>Normal experiences with your therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-green-600">Normal Sensations</h4>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Mild tingling or buzzing sensation</li>
                  <li>• Gradual symptom relief over time</li>
                  <li>• Different sensations with different programs</li>
                  <li>• Ability to adjust intensity as needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Adjustment Period</h4>
                <p className="text-muted-foreground mt-1">
                  It may take several weeks to months to find your optimal settings. Your care team will fine-tune your therapy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Guidelines</CardTitle>
            <CardDescription>Living with your device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-green-600">Safe Activities</h4>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Walking, swimming, light exercise</li>
                  <li>• Normal daily activities</li>
                  <li>• Most travel (with precautions)</li>
                  <li>• Non-strenuous work</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-600">Discuss with Doctor</h4>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• High-impact sports</li>
                  <li>• Heavy lifting (&gt;25 lbs)</li>
                  <li>• Certain medical procedures (e.g., MRI)</li>
                  <li>• Extreme physical exertion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  // Render for DBS vs SCS
  if (isDBS) {
    return (
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Treatment Information</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Dynamic Overview & Procedure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              What is {title}?
            </CardTitle>
            <CardDescription>Understanding your therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{therapy.overview}</p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              How It Works
            </CardTitle>
            <CardDescription>Step-by-step mechanism</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {therapy.how_it_works.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground">{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Shared static content */}
        {SCSContent}
      </div>
    );
  }

  // Default SCS
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Treatment Information</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Dynamic Overview & Procedure for SCS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            What is {title}?
          </CardTitle>
          <CardDescription>Understanding your therapy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{therapy.overview}</p>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            How It Works
          </CardTitle>
          <CardDescription>Step-by-step mechanism</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {therapy.how_it_works.map((step, i) => (
              <li key={i} className="text-sm text-muted-foreground">{step}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Shared static content */}
      {SCSContent}
    </div>
  );
}
