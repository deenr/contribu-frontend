import LoginPage from '@/pages/login-page';
import { BrowserRouter, Route, Routes } from 'react-router';
import RegisterPage from './pages/register-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
