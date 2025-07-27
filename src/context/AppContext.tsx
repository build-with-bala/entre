"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Query, Role, ResolutionStep } from '@/types';
import { users as initialUsers } from '@/data/users';
import { queries as initialQueries } from '@/data/queries';
import { roles } from '@/data/roles';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  queries: Query[];
  roles: Role[];
  addQuery: (data: { title: string; description: string; category: "IT" | "Media" | "Academic" | "General"; }) => void;
  updateQuery: (queryId: number, status: Query['status'], action: string, assignedToUserId?: number) => void;
  login: (userId: number, pass: string) => boolean;
  logout: () => void;
  authChecked: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [queries, setQueries] = useState<Query[]>(initialQueries);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('currentUser');
    if (storedUserId) {
      const user = users.find(u => u.id === parseInt(storedUserId, 10));
      if (user) {
        setCurrentUser(user);
      }
    }
    setAuthChecked(true);
  }, [users]);


  const login = (userId: number, pass: string): boolean => {
    if (pass === 'XXX') {
      const user = users.find(u => u.id === userId);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', user.id.toString());
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const addQuery = (data: { title: string; description: string; category: "IT" | "Media" | "Academic" | "General" }) => {
    if (!currentUser) return;

    const cr = users.find(u => u.role === 'CR' && u.class === currentUser.class);

    if (!cr) {
      console.error("No CR found for this class");
      // In a real app, handle this case - maybe assign to admin
      return;
    }

    const newQuery: Query = {
      id: Date.now(),
      ...data,
      createdBy: currentUser.id,
      status: "In Progress",
      resolutionTrail: [
        {
          step: 1,
          handledBy: { role: currentUser.role, name: currentUser.name },
          action: "Query Submitted",
          timestamp: new Date().toISOString(),
        },
        {
          step: 2,
          handledBy: { role: cr.role, name: cr.name },
          action: "Assigned to Class Representative",
          timestamp: new Date().toISOString(),
        }
      ],
    };
    setQueries(prev => [newQuery, ...prev]);
  };

  const updateQuery = (queryId: number, status: Query['status'], actionText: string) => {
    if(!currentUser) return;

    setQueries(prevQueries => prevQueries.map(q => {
      if (q.id === queryId) {
        const newStep: ResolutionStep = {
          step: q.resolutionTrail.length + 1,
          handledBy: {
            role: currentUser.role,
            name: currentUser.name
          },
          action: actionText,
          timestamp: new Date().toISOString(),
        };
        return {
          ...q,
          status,
          resolutionTrail: [...q.resolutionTrail, newStep]
        };
      }
      return q;
    }));
  };

  const value = {
    currentUser,
    setCurrentUser,
    users,
    queries,
    roles,
    addQuery,
    updateQuery,
    login,
    logout,
    authChecked
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
