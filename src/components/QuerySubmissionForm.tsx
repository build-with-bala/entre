"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useTransition } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { suggestResolvers } from "@/ai/flows/suggest-resolvers";
import { Badge } from "./ui/badge";
import { Loader2, Wand2 } from "lucide-react";
import type { Role } from "@/types";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.enum(["IT", "Media", "Academic", "General"]),
});

export default function QuerySubmissionForm() {
  const { addQuery, currentUser } = useApp();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState<Role[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "General",
    },
  });

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (description.length > 20) {
        setIsLoadingSuggestions(true);
        try {
          const result = await suggestResolvers({ queryText: description });
          setSuggestions((result.suggestedResolvers as Role[]) || []);
        } catch (error) {
          console.error("AI suggestion failed:", error);
          setSuggestions([]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [description]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      addQuery(values);
      toast({
        title: "✅ Query Submitted",
        description: "Your query has been successfully submitted and routed.",
      });
      form.reset();
      setDescription("");
      setSuggestions([]);
    });
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">New Query Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Projector not working in Hall 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the issue."
                      className="resize-y min-h-[120px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setDescription(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {(isLoadingSuggestions || suggestions.length > 0) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                <Wand2 className="h-4 w-4 text-accent" />
                <span>AI Suggested Resolvers:</span>
                {isLoadingSuggestions ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {suggestions.map((s, i) => <Badge key={i} variant="outline">{s}</Badge>)}
                  </div>
                )}
              </div>
            )}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || !currentUser} className="w-full sm:w-auto">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentUser ? 'Submit Query' : 'Select a role to submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
