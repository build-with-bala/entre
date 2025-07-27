"use client";

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Tag, ChevronRight } from 'lucide-react';
import QueryTimeline from '@/components/QueryTimeline';
import { getRoleIcon } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Role } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function QueryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { queries, users, currentUser, updateQuery } = useApp();
  const id = Number(params.id);

  const query = useMemo(() => queries.find((q) => q.id === id), [queries, id]);
  const createdByUser = useMemo(() => users.find((u) => u.id === query?.createdBy), [users, query]);

  const handleResolve = () => {
    if (!query || !currentUser) return;
    updateQuery(query.id, 'Resolved', `Resolved by ${currentUser.role} (${currentUser.name})`);
    toast({ title: "Query Resolved", description: `Query #${query.id} has been marked as resolved.` });
    router.push('/');
  };

  const handleForward = (role: Role) => {
    if (!query || !currentUser) return;
    const assignedUser = users.find(u => u.role === role);
    updateQuery(query.id, 'In Progress', `Forwarded to ${role} by ${currentUser.role} (${currentUser.name})`, assignedUser?.id);
    toast({ title: "Query Forwarded", description: `Query #${query.id} has been forwarded to ${role}.` });
    router.push('/');
  };

  const handleEscalate = () => {
    if (!query || !currentUser) return;
    const adminUser = users.find(u => u.role === 'Admin');
    updateQuery(query.id, 'Pending Admin', `Escalated to Admin by ${currentUser.role} (${currentUser.name})`, adminUser?.id);
    toast({ title: "Query Escalated", description: `Query #${query.id} has been escalated to Admin.` });
    router.push('/');
  };

  const canResolve = useMemo(() => {
    if (!currentUser || !query || query.status === 'Resolved') return false;
    switch (currentUser.role) {
      case 'Admin': return true;
      case 'CR':
      case 'MediaClub':
      case 'ITClub':
        return query.category !== 'General';
      default: return false;
    }
  }, [currentUser, query]);
  
  const canForward = useMemo(() => {
      if (!currentUser || !query || query.status === 'Resolved') return false;
      return currentUser.role === 'CR';
  }, [currentUser, query]);

  const canEscalate = useMemo(() => {
    if (!currentUser || !query || query.status === 'Resolved') return false;
    return currentUser.role === 'MediaClub' || currentUser.role === 'ITClub';
  }, [currentUser, query]);

  if (!query || !createdByUser) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Query not found.</p>
      </div>
    );
  }

  const CategoryIcon = getRoleIcon(query.category === 'IT' ? 'ITClub' : query.category === 'Media' ? 'MediaClub' : 'Student');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="mb-4">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-headline">{query.title}</CardTitle>
                <span className={`px-3 py-1 text-sm rounded-full ${query.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {query.status}
                </span>
              </div>
              <CardDescription>{query.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Created by: {createdByUser.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>On: {new Date(query.resolutionTrail[0].timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CategoryIcon className="h-4 w-4" />
                  <span>Category: {query.category}</span>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold font-headline">Resolution Timeline</h3>
                <QueryTimeline query={query} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Actions</CardTitle>
              <CardDescription>Perform actions based on your role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {query.status !== 'Resolved' && (
                <>
                  {canResolve && <Button onClick={handleResolve} className="w-full">Mark as Resolved</Button>}
                  
                  {canForward && (
                    <div className='flex items-center gap-2'>
                        <Select onValueChange={(role) => handleForward(role as Role)} >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Forward to..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ITClub">IT Club</SelectItem>
                                <SelectItem value="MediaClub">Media Club</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                  )}

                  {canEscalate && <Button onClick={handleEscalate} variant="outline" className="w-full">Escalate to Admin</Button>}
                </>
              )}

              {query.status === 'Resolved' && <p className="text-sm text-center text-green-600">This query has been resolved.</p>}
              
              {!canResolve && !canForward && !canEscalate && query.status !== 'Resolved' && (
                <p className="text-sm text-center text-muted-foreground">You do not have permission to perform actions on this query.</p>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
