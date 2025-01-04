import { AppLayout } from '@/layouts/app-layout';
import { DashboardPage } from '@/pages/dashboard-page';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { RepositoryPage } from '@/pages/repository-page';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/repository" element={<RepositoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
