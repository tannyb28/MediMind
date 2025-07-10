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

const SCS_ID = '686fe97a7679d49d194e4aa0';
const DBS_ID = '68702ada7679d49d194e4aad';

export default function TreatmentInformation() {
  const [therapyId, setTherapyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/patients/me')
      .then(res => {
        setTherapyId(res.data.therapy_id);
      })
      .catch(() => setTherapyId(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Helper: SCS shared content
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
          <CardDescription>Technical details about your SCS system</CardDescription>
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

      {/* Treatment Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Treatment Timeline & Follow-up
          </CardTitle>
          <CardDescription>Your ongoing care schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-3">Recent Milestones</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Device Implantation</span>
                      <p className="text-muted-foreground">January 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Initial Programming</span>
                      <p className="text-muted-foreground">February 1, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">3-Month Follow-up</span>
                      <p className="text-muted-foreground">April 15, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Upcoming Appointments</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Programming Adjustment</span>
                      <p className="text-muted-foreground">June 28, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Annual Check-up</span>
                      <p className="text-muted-foreground">January 15, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What to Expect</CardTitle>
            <CardDescription>Normal experiences with SCS therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-green-600">Normal Sensations</h4>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Mild tingling or buzzing sensation</li>
                  <li>• Gradual pain relief over time</li>
                  <li>• Different sensations with different programs</li>
                  <li>• Ability to adjust intensity as needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Adjustment Period</h4>
                <p className="text-muted-foreground mt-1">
                  It may take several weeks to months to find optimal settings. 
                  Your doctor will work with you to fine-tune your therapy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Guidelines</CardTitle>
            <CardDescription>Living with your SCS device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-green-600">Safe Activities</h4>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Walking, swimming, light exercise</li>
                  <li>• Normal daily activities</li>
                  <li>• Most travel (with precautions)</li>
                  <li>• Work activities (non-physical)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-600">Discuss with Doctor</h4>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• High-impact sports</li>
                  <li>• Heavy lifting (&gt;25 lbs)</li>
                  <li>• Medical procedures (MRI, surgery)</li>
                  <li>• Extreme physical activities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  if (therapyId === DBS_ID) {
    // DBS header/overview, then SCSContent
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Treatment Information</h1>
            <p className="text-muted-foreground">Understanding your deep brain stimulation therapy</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              What is Deep Brain Stimulation?
            </CardTitle>
            <CardDescription>Understanding your therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                Deep brain stimulation (DBS) is a neurosurgical procedure that uses electrical impulses to regulate abnormal brain activity. It is commonly used to treat movement disorders such as Parkinson's disease, essential tremor, and dystonia.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">How It Works</h4>
                  <p className="text-sm text-muted-foreground">
                    Electrodes are implanted in specific areas of the brain and connected to a pulse generator (neurostimulator) placed under the skin in the chest. The device sends electrical signals to targeted brain regions to help control symptoms.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Your Device</h4>
                  <p className="text-sm text-muted-foreground">
                    Medtronic Percept™ PC Neurostimulator or similar, with advanced programming for personalized symptom management.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {SCSContent}
      </div>
    );
  }

  // Default: SCS header/overview, then SCSContent
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
          <p className="text-muted-foreground">Understanding your spinal cord stimulation therapy</p>
        </div>
      </div>
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            What is Spinal Cord Stimulation?
          </CardTitle>
          <CardDescription>Understanding your therapy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              Spinal cord stimulation (SCS) is an advanced pain management therapy that uses mild electrical pulses 
              to interrupt pain signals before they reach your brain. Your implanted device delivers these carefully 
              controlled signals to the dorsal columns of your spinal cord, helping to reduce chronic pain.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">How It Works</h4>
                <p className="text-sm text-muted-foreground">
                  Electrical impulses stimulate nerve fibers in the spinal cord, blocking pain signals 
                  from reaching the brain and replacing them with a mild tingling sensation.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Your Device</h4>
                <p className="text-sm text-muted-foreground">
                  Medtronic Intellis™ Spinal Cord Stimulator with advanced programming capabilities 
                  for personalized pain relief.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {SCSContent}
    </div>
  );
}