import { Contribu } from '@/components/common/icons/contribu';
import { RegisterForm } from '@/components/features/auth/register/register-form';

export function RegisterPage() {
  return (
    <div className="bg-background grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Contribu className="text-primary h-6 w-fit" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
