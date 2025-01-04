import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@repo/ui/components/ui/dropdown-menu';
import { Separator } from '@repo/ui/components/ui/separator';
import { Calendar, Clock, Edit, GitCommit, GitMerge, MoreHorizontal, Trash } from 'lucide-react';
import { GitHub } from './icons/github';

const repositoryData = {
  name: 'TEXconnect-clone',
  createdAt: '2025-01-01',
  lastUpdated: '2025-03-15',
  commitCount: 256,
  mergedFrom: [
    {
      id: '2',
      name: 'legacy-api',
      description: 'Original API repository',
      createdAt: '2023-12-01',
      provider: 'GitHub'
    },
    {
      id: '3',
      name: 'old-frontend',
      description: 'Legacy frontend codebase',
      createdAt: '2023-11-15',
      provider: 'GitHub'
    }
  ]
};

export function RepositoryCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{repositoryData.name}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 pt-3">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-xs font-medium">Created</span>
            <span className="flex items-center text-sm">
              <Calendar className="mr-1 size-4" />
              {new Date(repositoryData.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-xs font-medium">Last Updated</span>
            <span className="flex items-center text-sm">
              <Clock className="mr-1 size-4" />
              {new Date(repositoryData.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-xs font-medium">Commits</span>
            <span className="flex items-center text-sm">
              <GitCommit className="mr-1 size-4" />
              {repositoryData.commitCount}
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        {repositoryData.mergedFrom && repositoryData.mergedFrom.length > 0 && (
          <div className="space-y-3">
            <h4 className="flex items-center text-sm font-medium">
              <GitMerge className="mr-1 h-4 w-4" />
              Merged repositories
            </h4>
            <div className="space-y-3">
              {repositoryData.mergedFrom.map((repo) => (
                <div key={repo.id} className="bg-secondary flex items-center justify-between rounded-md p-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary ml-1.5 size-1.5 rounded-full"></div>
                    <span className="text-sm font-medium">{repo.name}</span>
                  </div>
                  <div className="text-muted-foreground text-xs">{new Date(repo.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-row gap-3">
        <Button variant="outline" className="w-full">
          <GitHub />
          View repository
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="min-w-9">
              <span className="sr-only">Open actions menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <GitCommit className="mr-2 h-4 w-4" />
              <span>View commits</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
