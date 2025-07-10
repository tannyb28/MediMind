import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Droplets, Thermometer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function DeviceCare() {
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
          <h1 className="text-3xl font-bold">Device Care</h1>
          <p className="text-muted-foreground">Maintenance and care instructions for your spinal cord stimulator</p>
        </div>
      </div>

      {/* Daily Care */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Daily Care Instructions
          </CardTitle>
          <CardDescription>Essential daily maintenance for optimal device performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Clean Incision Site</h4>
                <p className="text-sm text-muted-foreground">Gently clean around the incision site daily with mild soap and water. Pat dry with a clean towel.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Check Battery Status</h4>
                <p className="text-sm text-muted-foreground">Monitor your device's battery level weekly and ensure it stays above 20%.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Inspect for Swelling</h4>
                <p className="text-sm text-muted-foreground">Look for any redness, swelling, or unusual discharge around the device site.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Avoid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            What to Avoid
          </CardTitle>
          <CardDescription>Important precautions to protect your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Water Exposure</h4>
                <p className="text-sm text-muted-foreground">Avoid submersion in water until fully healed. Use waterproof coverings when showering if advised by your doctor.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Electromagnetic Fields</h4>
                <p className="text-sm text-muted-foreground">Stay away from strong magnetic fields, MRI machines (unless MRI-conditional), and high-voltage electrical equipment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Thermometer className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Extreme Temperatures</h4>
                <p className="text-sm text-muted-foreground">Avoid saunas, hot tubs, and extreme cold environments that could affect device function.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Signs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            When to Contact Your Doctor
          </CardTitle>
          <CardDescription>Watch for these warning signs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-red-600">Immediate Contact</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Severe pain at device site</li>
                <li>• Signs of infection (fever, pus, red streaks)</li>
                <li>• Device feels loose or moves</li>
                <li>• Sudden loss of pain relief</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-orange-600">Within 24 Hours</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Persistent swelling or redness</li>
                <li>• Unusual sensations or shocks</li>
                <li>• Battery draining faster than usual</li>
                <li>• Questions about care routine</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>Keep these numbers readily available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium">Healthcare Provider</h4>
              <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
              <p className="text-sm font-mono">(555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-medium">24/7 Emergency Line</h4>
              <p className="text-sm text-muted-foreground">Medical Emergency Support</p>
              <p className="text-sm font-mono">(555) 999-0000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 