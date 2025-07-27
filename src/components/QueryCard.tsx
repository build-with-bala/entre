"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import type { Query } from '@/types';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Tag } from 'lucide-react';
import { getRoleIcon } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface QueryCardProps {
  query: Query;
}

export default function QueryCard({ query }: QueryCardProps) {
  const { users } = useApp();
  const createdByUser = useMemo(() => users.find(u => u.id === query.createdBy), [users, query.createdBy]);

  const statusVariant = query.status === 'Resolved' ? 'default' : 'secondary';
  const statusClass = query.status === 'Resolved' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600';
  
  const CategoryIcon = getRoleIcon(query.category === 'IT' ? 'ITClub' : query.category === 'Media' ? 'MediaClub' : 'Student');

  return (
    <Link href={`/query/${query.id}`} className="block">
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-headline leading-tight">{query.title}</CardTitle>
            <Badge className={cn("text-white shrink-0", statusClass)}>{query.status}</Badge>
          </div>
          <CardDescription className="line-clamp-2">{query.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <CategoryIcon className="h-4 w-4" />
            <span>Category: {query.category}</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>{createdByUser?.name || 'Unknown User'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(query.resolutionTrail[0].timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
