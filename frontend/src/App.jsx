import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserManagement from './components/admin/UserManagement';
import DiscountManagement from './components/admin/DiscountManagement';
import AppLayout from './components/layout/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={
          <AppLayout>
            <Routes>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/discounts" element={<DiscountManagement />} />
              <Route path="/dashboard" element={<Navigate to="/admin/users" />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
