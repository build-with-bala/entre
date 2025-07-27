"use client";

import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import QuerySubmissionForm from '@/components/QuerySubmissionForm';
import QueryCard from '@/components/QueryCard';
import { Separator } from '@/components/ui/separator';

export default function StudentDashboard() {
  const { currentUser, queries } = useApp();

  const myQueries = useMemo(() => {
    if (!currentUser) return [];
    return queries.filter(query => query.createdBy === currentUser.id).sort((a,b) => b.id - a.id);
  }, [queries, currentUser]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Submit a New Query</h1>
        <p className="text-muted-foreground">Have an issue or a question? Let us know.</p>
      </div>
      <QuerySubmissionForm />
      
      <Separator />

      <div>
        <h2 className="text-2xl font-bold font-headline">My Queries</h2>
        {myQueries.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myQueries.map(query => <QueryCard key={query.id} query={query} />)}
          </div>
        ) : (
          <div className="mt-4 text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven't submitted any queries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
