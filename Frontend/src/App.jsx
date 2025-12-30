import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashBoardLayout';
import UserTable from './components/dashboard/UserTable';
import Register from './components/Register';
import Login from './components/Login';
import CheckPage from './components/Ckecl';
import TasksPage from './components/dashboard/TasksPage';
import AnalyticsPage from './pages/AnalyticsPage';   // ✅ import your new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout><UserTable /></DashboardLayout>} />
        <Route path="/users" element={<DashboardLayout><UserTable /></DashboardLayout>} />
        <Route path="/tasks" element={<DashboardLayout><TasksPage /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} /> {/* ✅ new route */}
        <Route path="/register" element={<DashboardLayout><Register /></DashboardLayout>} />
        <Route path="/login" element={<DashboardLayout> <Login /></DashboardLayout>} />
        {/* <Route path="/test" element={<CheckPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;