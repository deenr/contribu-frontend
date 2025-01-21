import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Skeleton } from '@repo/ui/components/ui/skeleton';

export function GitIntegrationSkeleton() {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="ml-auto h-6 w-10 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <div className="flex w-2/3 flex-row items-center gap-3">
          <div className="flex flex-1 flex-col space-y-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex flex-1 flex-col space-y-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
