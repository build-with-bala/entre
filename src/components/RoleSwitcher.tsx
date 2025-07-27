"use client";

import { useApp } from '@/context/AppContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getRoleIcon } from '@/lib/utils';
import { User } from 'lucide-react';

export default function RoleSwitcher() {
  const { roles, users, currentUser, setCurrentUser } = useApp();

  const handleValueChange = (userId: string) => {
    const user = users.find(u => u.id === parseInt(userId, 10));
    if (user) {
      setCurrentUser(user);
    }
  };

  const CurrentUserAvatar = currentUser ? getRoleIcon(currentUser.role) : User;
  
  return (
    <div className="flex items-center gap-2">
      {currentUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">
            <CurrentUserAvatar className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <Select onValueChange={handleValueChange} value={currentUser?.id.toString()}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a role..." />
        </SelectTrigger>
        <SelectContent>
          {roles.map(role => (
            users.filter(u => u.role === role).map(user => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name} ({user.role})
              </SelectItem>
            ))
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
