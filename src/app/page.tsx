"use client";

import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import CRDashboard from '@/components/dashboards/CRDashboard';
import ClubDashboard from '@/components/dashboards/ClubDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { currentUser, authChecked } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, authChecked, router]);

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
  
  if (!authChecked || !currentUser) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {DashboardComponent}
    </main>
  );
}
