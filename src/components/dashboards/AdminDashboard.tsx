"use client";

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import QueryCard from '@/components/QueryCard';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRoleIcon } from '@/lib/utils';
import { User, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const { queries, users } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueries = useMemo(() => {
    return queries.filter(query =>
      query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [queries, searchTerm]);

  const stats = useMemo(() => ({
    total: queries.length,
    resolved: queries.filter(q => q.status === 'Resolved').length,
    pending: queries.filter(q => q.status !== 'Resolved').length,
    users: users.length,
  }), [queries, users]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Queries</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending Queries</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.pending}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Resolved Queries</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.resolved}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.users}</div></CardContent></Card>
      </div>

      <Tabs defaultValue="queries">
        <TabsList>
          <TabsTrigger value="queries">All Queries</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <Input
                placeholder="Search all queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredQueries.map(query => <QueryCard key={query.id} query={query} />)}
              </div>
              {filteredQueries.length === 0 && <p className="text-center text-muted-foreground">No queries found.</p>}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Class/Club</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => {
                    const RoleIcon = getRoleIcon(user.role);
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <RoleIcon className="h-4 w-4 text-muted-foreground" />
                            {user.role}
                          </div>
                        </TableCell>
                        <TableCell>{user.class || user.club || 'N/A'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
