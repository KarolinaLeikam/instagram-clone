import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';

const ProtectedLayout = () => (
  <AuthProvider>
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  </AuthProvider>
);

export default ProtectedLayout;
