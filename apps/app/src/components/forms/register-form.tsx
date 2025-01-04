import { Bitbucket } from '@/components/icons/bitbucket';
import { GitHub } from '@/components/icons/github';
import { GitLab } from '@/components/icons/gitlab';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { cn } from '@repo/ui/lib/utils';
import { Link } from 'react-router';

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-balance text-sm">Enter your email below to create your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <GitHub className="h-6 w-6" />
            <span className="sr-only">Login with GitHub</span>
          </Button>
          <Button variant="outline" className="w-full">
            <GitLab className="h-6 w-6" />
            <span className="sr-only">Login with GitLab</span>
          </Button>
          <Button variant="outline" className="w-full">
            <Bitbucket className="h-6 w-6" />
            <span className="sr-only">Login with Bitbucket</span>
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
