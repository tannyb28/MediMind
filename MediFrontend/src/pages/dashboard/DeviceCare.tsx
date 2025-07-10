import React from 'react';
import { usePageAI } from '../../hooks/usePageAI';
import * as Icons from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';

export default function DeviceCare() {
  const { data: page, isLoading, error } = usePageAI('device-care');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading content.</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{page.title}</h1>
        <p className="text-muted-foreground">{page.description}</p>
      </div>

      {/* Top-level Alert */}
      {page.alert && (
        <Alert variant={page.alert.variant ?? 'info'}>
          <div className="flex items-center gap-2">
            {(() => {
              const Icon = (Icons as any)[page.alert.icon];
              return Icon ? <Icon className="h-4 w-4" /> : null;
            })()}
            <span className="sr-only">{page.alert.title}</span>
          </div>
          <AlertTitle>{page.alert.title}</AlertTitle>
          <AlertDescription>{page.alert.description}</AlertDescription>
        </Alert>
      )}

      {/* Tabbed Sections */}
      {page.tabs && (
        <Tabs defaultValue={page.tabs[0].key} className="space-y-4">
          <TabsList>
            {page.tabs.map((tab: any) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {page.tabs.map((tab: any) => (
            <TabsContent key={tab.key} value={tab.key} className="space-y-4">
              {/* Alerts within a tab */}
              {tab.alerts?.map((a: any, i: any) => (
                <Alert key={i} variant={a.variant ?? 'destructive'}>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = (Icons as any)[a.icon];
                      return Icon ? <Icon className="h-4 w-4" /> : null;
                    })()}
                  </div>
                  <AlertTitle>{a.title}</AlertTitle>
                  <AlertDescription>{a.description}</AlertDescription>
                </Alert>
              ))}

              {/* Cards within a tab */}
              {tab.cards?.map((card: any) => (
                <Card key={card.title}>
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    {card.description && <CardDescription>{card.description}</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {card.content.map((section: any) => (
                      <div key={section.heading ?? section.body.slice(0,20)} className="space-y-2">
                        {section.heading && <h3 className="font-medium">{section.heading}</h3>}
                        <p>{section.body}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Checklist Section */}
      {page.checklist && (
        <Card>
          <CardHeader>
            <CardTitle>{page.title} Checklist</CardTitle>
            <CardDescription>Daily and weekly maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {page.checklist.map((item: any) => (
                <div key={item.title} className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    {(() => {
                      const Icon = (Icons as any)[item.icon];
                      return Icon ? <Icon className="h-5 w-5 text-green-500" /> : null;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
