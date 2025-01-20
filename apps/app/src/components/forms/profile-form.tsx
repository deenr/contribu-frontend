import axiosInstance from '@/services/axios-instance';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Separator } from '@repo/ui/components/ui/separator';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ProfileFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email()
});

export function ProfileForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [savingInProgress, setSavingInProgress] = useState<boolean>(false);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const { reset } = form;

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axiosInstance.get<{ firstName: string; lastName: string; email: string }>('user/me');
      setProfile(data);
    };

    getProfile();
  }, []);

  async function onSubmit(formData: z.infer<typeof ProfileFormSchema>) {
    setSavingInProgress(true);

    try {
      await axiosInstance.put<{ accessToken: string }>('user/me', { ...formData });
    } catch {
    } finally {
      setSavingInProgress(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className} {...props}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="flex w-full flex-col items-end gap-4 sm:flex-row">
                {profile ? (
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormInputSkeleton />
                )}
                {profile ? (
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormInputSkeleton />
                )}
              </div>
              {profile ? (
                <FormField
                  control={form.control}
                  name="email"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input autoComplete="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <FormInputSkeleton />
              )}
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="justify-end py-4">
            {profile ? (
              <Button type="submit">
                {savingInProgress && <Loader2 className="size-4 animate-spin" />}
                Save
              </Button>
            ) : (
              <Skeleton className="h-9 w-16" />
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function FormInputSkeleton({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`w-full space-y-2 ${className}`} {...props}>
      <Skeleton className="mt-1 h-[17px] w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
