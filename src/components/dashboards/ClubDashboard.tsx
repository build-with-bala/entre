"use client";

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import QueryCard from '@/components/QueryCard';
import { Input } from '@/components/ui/input';

export default function ClubDashboard() {
  const { currentUser, queries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const roleToCategory = {
    'MediaClub': 'Media',
    'ITClub': 'IT',
  };

  const relevantQueries = useMemo(() => {
    if (!currentUser || (currentUser.role !== 'MediaClub' && currentUser.role !== 'ITClub')) return [];
    
    const category = roleToCategory[currentUser.role];

    return queries.filter(query =>
      (query.category === category && query.status !== 'Resolved') &&
      (query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       query.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [queries, currentUser, searchTerm, roleToCategory]);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">{currentUser.role === 'MediaClub' ? 'Media Club' : 'IT Club'} Dashboard</h1>
        <div className="w-full md:w-auto">
          <Input
            placeholder="Search assigned queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relevantQueries.map(query => (
          <QueryCard key={query.id} query={query} />
        ))}
      </div>
      {relevantQueries.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No pending queries assigned to your club.</p>
        </div>
      )}
    </div>
  );
}
