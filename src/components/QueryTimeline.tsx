"use client";

import type { Query } from "@/types";
import { getRoleIcon } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QueryTimelineProps {
  query: Query;
}

export default function QueryTimeline({ query }: QueryTimelineProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 ml-3"></div>
      <ul className="space-y-8">
        {query.resolutionTrail.map((step, index) => {
          const isLastStep = index === query.resolutionTrail.length - 1;
          const isResolved = isLastStep && query.status === "Resolved";
          const RoleIcon = getRoleIcon(step.handledBy.role);
          
          return (
            <li key={step.step} className="relative flex items-start">
              <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full -translate-x-1/2 bg-background ring-4 ring-background">
                {isResolved ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <RoleIcon className={cn("h-5 w-5", isLastStep ? "text-primary" : "text-muted-foreground")} />
                )}
              </span>
              <div className="ml-6 flex-1">
                <div className="flex justify-between items-center">
                  <p className={cn("font-semibold", isLastStep && "text-primary-foreground")}>{step.action}</p>
                </div>
                <p className="text-sm text-muted-foreground">{step.handledBy.name} ({step.handledBy.role})</p>
                <time className="text-xs text-muted-foreground/80">{new Date(step.timestamp).toLocaleString()}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
