import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
export function SkeletonCard({ cards=1 }) {
  const [array] = useState(new Array(cards).fill(null));

  return (
    <div className="flex flex-wrap items-start w-full justify-center gap-3">
      {array.map((_, index) => {
        return (
          <div
            key={index}
            className="flex-1 h-full w-full rounded-xl relative cursor-wait"
          >
            <Skeleton className="h-48 bg-slate-400 w-full rounded-xl object-cover" />
            <div className="flex w-full justify-around items-center p-2 gap-2">
              <Skeleton className="h-10 w-10 rounded-full bg-slate-400" />
              <div className="w-full grid gap-2">
                <Skeleton className="h-3 bg-slate-400 rounded-xl" />
                <Skeleton className="h-3 bg-slate-400 rounded-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
