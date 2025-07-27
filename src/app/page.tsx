
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Users, Shield } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { currentUser } = useApp();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 lg:py-32 bg-background">
        <div className="absolute inset-0 bg-primary/10 -skew-y-3"></div>
        <div className="relative z-10 container mx-auto px-4">
          <Icons.logo className="h-24 w-24 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground font-headline">
            Welcome to CampusConnect
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            The streamlined solution for resolving student queries on campus. Connect, communicate, and resolve issues efficiently.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href={currentUser ? "/dashboard" : "/login"}>
                {currentUser ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline">Why CampusConnect?</h2>
          <p className="text-muted-foreground text-center mt-2 mb-12">
            A centralized platform for transparent and efficient query resolution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">Centralized Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Submit any query, from IT issues to event requests, through a single, easy-to-use portal.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">Clear Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Queries are automatically routed to the right person—CRs, clubs, or admin—for faster responses.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">Transparent Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Track the status of your query in real-time with a clear resolution timeline. No more ambiguity.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
       <footer className="bg-muted text-muted-foreground py-6">
          <div className="container mx-auto px-4 text-center">
              <p>&copy; {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          </div>
      </footer>
    </main>
  );
}
