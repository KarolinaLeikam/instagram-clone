import { Navigate } from 'react-router-dom';
import { useAuthMeQuery } from '@/redux/slices/authSlice';
import { Spinner } from '@/components/ui';
import routes from '@/utils/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
// пока юзер не залогинин, не показывай children
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data, isLoading } = useAuthMeQuery();

  if (isLoading) return <Spinner />;

  return data?.user ? children : <Navigate to={routes.login} replace />;
};

export default ProtectedRoute;
