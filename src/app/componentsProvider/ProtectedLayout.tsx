import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute/ProtectedRoute';

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
);

export default ProtectedLayout;
