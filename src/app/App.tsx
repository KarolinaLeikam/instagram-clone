import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import Feed from '@/pages/Feed/Feed';
import Profile from '@/pages/Profile/Profile';
import Post from '@/pages/Post/Post';
import Login from '@/pages/Login/Login.js';
import SignUp from '@/pages/SignUp/SignUp';
import EditProfile from '@/pages/EditProfile/EditProfile';
import SearchUsers from '@/pages/SearchUsers/SearchUsers.js';
import ProtectedRoute from '@/components/common/ProtectedRoute/ProtectedRoute.js';
import { AuthProvider } from '@/context/AuthContext';
import { GetAllPosts } from '@/context/GetAllPosts';
import './styles/index.js';

const ProtectedLayout = () => (
  <AuthProvider>
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/main', element: <Feed /> },
      { path: '/edit', element: <EditProfile /> },
      { path: '/search', element: <SearchUsers /> },
      {
        path: '/profile',
        element: (
          <GetAllPosts>
            <Profile />
          </GetAllPosts>
        ),
      },
      {
        path: '/post',
        element: (
          <GetAllPosts>
            <Post />
          </GetAllPosts>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
