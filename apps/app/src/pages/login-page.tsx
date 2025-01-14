import { LoginForm } from '@/components/forms/login-form';
import { Contribu } from '@/components/icons/contribu';

export function LoginPage() {
  return (
    <div className="bg-background grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Contribu className="text-primary h-6 w-fit" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* <img src="/placeholder.svg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" /> */}
      </div>
    </div>
  );
}
