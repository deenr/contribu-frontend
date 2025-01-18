// import { Bitbucket } from '@/components/icons/bitbucket';
// import { GitHub } from '@/components/icons/github';
// import { GitLab } from '@/components/icons/gitlab';
// import { ConnectionStatus, GitProviderStatus } from '@/types/git-provider-status';
// import { RepositoryPlatform } from '@/types/repository';
// import { Badge } from '@repo/ui/components/ui/badge';
// import { Button } from '@repo/ui/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@repo/ui/components/ui/dropdown-menu';
// import { Blocks, ChevronDown, FolderGit2 } from 'lucide-react';

// export function GitProvidersStatus({ providers }: { providers: GitProviderStatus[] }) {
//   function getIcon(provider: RepositoryPlatform) {
//     switch (provider) {
//       case 'github':
//         return <GitHub className="size-4" />;
//       case 'gitlab':
//         return <GitLab className="size-4" />;
//       case 'bitbucket':
//         return <Bitbucket className="size-4" />;
//     }
//   }

//   function getName(provider: RepositoryPlatform) {
//     switch (provider) {
//       case 'github':
//         return 'GitHub';
//       case 'gitlab':
//         return 'GitLab';
//       case 'bitbucket':
//         return 'Bitbucket';
//     }
//   }

//   const getStatusColor = (status: ConnectionStatus) => {
//     switch (status) {
//       case 'valid':
//         return 'bg-green-500';
//       case 'not_authorized':
//         return 'bg-muted-foreground';
//       case 'expired':
//         return 'bg-destructive';
//     }
//   };

//   const getStatusText = (status: ConnectionStatus) => {
//     switch (status) {
//       case 'valid':
//         return 'Valid';
//       case 'not_authorized':
//         return 'Not authorized';
//       case 'expired':
//         return 'Token expired';
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" className="px-3" role="combobox" aria-label="View Git provider connections">
//           <FolderGit2 className="text-muted-foreground size-5" />
//           {providers.filter((p) => p.status === 'valid').length}/{providers.length} Connected
//           <ChevronDown className="text-muted-foreground ml-1 size-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="min-w-64 rounded-lg" side="bottom" align="end" sideOffset={4}>
//         {providers.map(({ provider, status }) => (
//           <DropdownMenuItem key={provider} className="justify-between">
//             <div className="flex flex-row items-center gap-2">
//               {getIcon(provider)}
//               {getName(provider)}
//             </div>
//             <Badge variant="outline" className="bg-background pl-2">
//               <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${getStatusColor(status)}`}></div>
//               {getStatusText(status)}
//             </Badge>
//           </DropdownMenuItem>
//         ))}
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>
//           <Blocks />
//           Manage Git providers
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
