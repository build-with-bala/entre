"use client";

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import QueryCard from '@/components/QueryCard';
import { Input } from '@/components/ui/input';
import QuerySubmissionForm from '../QuerySubmissionForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function CRDashboard() {
  const { currentUser, users, queries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const relevantQueries = useMemo(() => {
    if (!currentUser || currentUser.role !== 'CR') return [];
    const classStudents = users.filter(user => user.role === 'Student' && user.class === currentUser.class);
    const studentIds = classStudents.map(student => student.id);
    return queries.filter(query =>
      studentIds.includes(query.createdBy) &&
      (query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       query.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [queries, users, currentUser, searchTerm]);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">CR Dashboard - {currentUser.class}</h1>
        <div className="w-full md:w-auto">
          <Input
            placeholder="Search class queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Submit a Query on Behalf of a Student</AccordionTrigger>
          <AccordionContent>
            <QuerySubmissionForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h2 className="text-2xl font-semibold font-headline">Pending Queries from Your Class</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relevantQueries.map(query => <QueryCard key={query.id} query={query} />)}
      </div>
      {relevantQueries.length === 0 && (
         <div className="text-center py-10">
          <p className="text-muted-foreground">No pending queries from your class.</p>
        </div>
      )}
    </div>
  );
}
