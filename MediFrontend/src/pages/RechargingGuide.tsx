import React from 'react';
import { ArrowLeft, Battery, Clock, Zap, CheckCircle, AlertCircle, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function RechargingGuide() {
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
          <h1 className="text-3xl font-bold">Recharging Guide</h1>
          <p className="text-muted-foreground">Complete guide for recharging your spinal cord stimulator</p>
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
            <div className="text-2xl font-bold">Weekly</div>
            <p className="text-xs text-muted-foreground">Every 7 days or when below 20%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Charge Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2-4 hours</div>
            <p className="text-xs text-muted-foreground">For full charge cycle</p>
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
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-xs text-muted-foreground">7 days until next charge</p>
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
          <CardDescription>Follow these steps for safe and effective charging</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Prepare the Charging Equipment</h4>
                <p className="text-sm text-muted-foreground mt-1">Ensure your charging paddle and power supply are clean and undamaged. Check all connections.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Position the Charging Paddle</h4>
                <p className="text-sm text-muted-foreground mt-1">Place the charging paddle directly over your implanted device. You should feel a slight magnetic pull when positioned correctly.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Secure with Belt</h4>
                <p className="text-sm text-muted-foreground mt-1">Use the provided belt to hold the paddle in place. Ensure it's snug but comfortable.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Start Charging Session</h4>
                <p className="text-sm text-muted-foreground mt-1">Press the power button on the charger. The LED should show a steady light indicating active charging.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Monitor Progress</h4>
                <p className="text-sm text-muted-foreground mt-1">Check the charger display regularly. You may feel a slight warming sensation, which is normal.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                6
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Charging Complete</h4>
                <p className="text-sm text-muted-foreground mt-1">The LED will change to green or display "100%" when fully charged. Remove the paddle and store equipment safely.</p>
              </div>
            </div>
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