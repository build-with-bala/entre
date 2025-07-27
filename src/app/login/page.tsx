
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { users, login } = useApp();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!selectedUserId) {
      setError('Please select a user.');
      return;
    }
    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = login(parseInt(selectedUserId, 10), password);
      setIsLoading(false);
      if (success) {
        toast({ title: 'Login Successful', description: 'Welcome back!' });
        router.push('/');
      } else {
        setError('Invalid user or password.');
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Please check your credentials and try again.',
        });
      }
    }, 500); // Simulate network delay
  };

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 p-4 w-24 h-24">
              <Icons.logo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to CampusConnect</CardTitle>
          <CardDescription>Please sign in to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-select">Select User</Label>
            <Select onValueChange={setSelectedUserId} value={selectedUserId}>
              <SelectTrigger id="user-select">
                <SelectValue placeholder="Select your account" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
             <p className="text-xs text-muted-foreground">Hint: The password is XXX</p>
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
