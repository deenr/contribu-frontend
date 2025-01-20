import { AuthProvider } from '@/components/providers/auth-provider';
import { SettingsIntegrations } from '@/components/settings-integrations';
import { AppLayout } from '@/layouts/app-layout';
import { DashboardPage } from '@/pages/dashboard-page';
import { LoginPage } from '@/pages/login-page';
import { ProviderLoadingPage } from '@/pages/provider-loading-page';
import { RegisterPage } from '@/pages/register-page';
import { RepositoryDetailPage } from '@/pages/repository-detail-page';
import { RepositoryPage } from '@/pages/repository-page';
import { SettingsPage } from '@/pages/settings-page';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';

function Root() {
  const navigate = useNavigate();

  return (
    <AuthProvider navigateToLogin={() => navigate('/login')}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth" element={<ProviderLoadingPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/repository" element={<RepositoryPage />} />
          <Route path="/repository/:id" element={<RepositoryDetailPage />} />
          <Route path="/settings" element={<SettingsPage />}>
            <Route index element={<>Profile</>} />
            <Route path="/settings/integrations" element={<SettingsIntegrations />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
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
