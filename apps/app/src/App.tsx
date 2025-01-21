import { AuthProvider } from '@/components/features/auth/auth-provider';
import { SettingsIntegrations } from '@/components/features/settings/settings-integrations';
import { SettingsProfile } from '@/components/features/settings/settings-profile';
import { AppLayout } from '@/components/layout/app-layout';
import { DashboardPage } from '@/components/routes/dashboard-page';
import { LoginPage } from '@/components/routes/login-page';
import { ProviderLoadingPage } from '@/components/routes/provider-loading-page';
import { RegisterPage } from '@/components/routes/register-page';
import { RepositoryDetailPage } from '@/components/routes/repository-detail-page';
import { RepositoryPage } from '@/components/routes/repository-page';
import { SettingsPage } from '@/components/routes/settings-page';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router';

function Root() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <AuthProvider navigateToLogin={() => navigate('/login')}>
            <Outlet />
          </AuthProvider>
        }
      >
        <Route path="/oauth" element={<ProviderLoadingPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/repository" element={<RepositoryPage />} />
          <Route path="/repository/:id" element={<RepositoryDetailPage />} />
          <Route path="/settings" element={<SettingsPage />}>
            <Route index element={<SettingsProfile />} />
            <Route path="/settings/integrations" element={<SettingsIntegrations />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
