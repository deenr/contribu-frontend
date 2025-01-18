import { Bitbucket } from '@/components/icons/bitbucket';
import { GitHub } from '@/components/icons/github';
import { GitLab } from '@/components/icons/gitlab';
import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { cn } from '@repo/ui/lib/utils';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { useAuth } from '../providers/auth-provider';

const RegisterFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
});

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [registerInProgress, setRegisterInProgress] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(formData: z.infer<typeof RegisterFormSchema>) {
    setRegisterInProgress(true);

    try {
      const { data } = await axiosInstance.post<{ accessToken: string }>(API_ROUTES.REGISTER, { ...formData });

      setToken(data.accessToken);

      navigate('/');
    } catch {
    } finally {
      setRegisterInProgress(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-balance text-sm">Enter your email below to create your account</p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="dean@contribu.me" autoComplete="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="h-fit transition-all">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {registerInProgress && <Loader2 className="size-4 animate-spin" />}
            Continue
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <GitHub className="h-6 w-6" />
              <span className="sr-only">Signup with GitHub</span>
            </Button>
            <Button variant="outline" className="w-full">
              <GitLab className="h-6 w-6" />
              <span className="sr-only">Signup with GitLab</span>
            </Button>
            <Button variant="outline" className="w-full">
              <Bitbucket className="h-6 w-6" />
              <span className="sr-only">Signup with Bitbucket</span>
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
    </Form>
  );
}
