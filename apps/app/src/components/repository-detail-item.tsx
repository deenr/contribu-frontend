import { Badge } from '@repo/ui/components/ui/badge';
import { Card } from '@repo/ui/components/ui/card';
import { Calendar, GitBranch, GitCommit, User } from 'lucide-react';

export function RepositoryDetailItem() {
  return (
    <Card className="grid grid-cols-[36px_auto] grid-rows-[auto_auto] gap-1 p-6">
      <GitCommit className="text-muted-foreground" />

      <div className="flex items-center gap-2">
        <h3 className="text-foreground truncate text-base font-semibold">This is a commit message</h3>
        <Badge variant="outline" className="pl-2 font-medium">
          <GitBranch className="mr-1 h-3 w-3" />
          a1b2c3d
        </Badge>
        <Badge variant="outline" className="font-medium">
          repo-1
        </Badge>
      </div>

      <div className="text-muted-foreground col-start-2 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1">
          <User className="h-4 w-4" />
          deenr
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </Card>
  );
}
