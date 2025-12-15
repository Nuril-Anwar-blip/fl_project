import Welcome from '@/pages/welcome';
import Dashboard from '@/pages/dashboard';
import FederatedMonitor from '@/pages/Federated/Monitor';
import PatientsIndex from '@/pages/patients/Index';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import PatientsCreate from '@/pages/patients/Create';

function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === '/' || path === '/welcome') {
    return <Welcome />;
  }

  if (path.startsWith('/login')) {
    return <Login canResetPassword canRegister />;
  }

  if (path.startsWith('/register')) {
    return <Register />;
  }

  if (path.startsWith('/dashboard')) {
    return <Dashboard stats={{}} />;
  }

  if (path.startsWith('/federated/monitor')) {
    return <FederatedMonitor />;
  }

  if (path.startsWith('/patients')) {
    if (path.startsWith('/patients/create')) {
      return <PatientsCreate />;
    }
    return <PatientsIndex patients={{ data: [] }} />;
  }

  return <Welcome />;
}

export default App
