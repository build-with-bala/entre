"use client";

import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import CRDashboard from '@/components/dashboards/CRDashboard';
import ClubDashboard from '@/components/dashboards/ClubDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function Home() {
  const { currentUser } = useApp();

  const DashboardComponent = useMemo(() => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'Student':
        return <StudentDashboard />;
      case 'CR':
        return <CRDashboard />;
      case 'MediaClub':
      case 'ITClub':
        return <ClubDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return null;
    }
  }, [currentUser]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {currentUser ? (
        DashboardComponent
      ) : (
        <div className="flex h-full flex-1 items-center justify-center">
          <Card className="w-full max-w-lg text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 p-4 w-24 h-24">
                <Icons.logo className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-3xl font-headline">Welcome to CampusConnect</CardTitle>
              <CardDescription className="text-lg">Your campus query resolution hub.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Please select a role from the dropdown menu in the header to get started.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
