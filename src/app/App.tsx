import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Feed from '@/pages/Feed/Feed';
import Profile from '@/pages/Profile/Profile';
import Post from '@/pages/Post/Post';
import Login from '@/pages/Login/Login.js';
import SignUp from '@/pages/SignUp/Signup.js';
import ProtectedRoute from '@/components/common/ProtectedRoute/ProtectedRoute.js';
import './styles/index.js';

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
    path: '/',
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/post',
    element: (
      <ProtectedRoute>
        <Post />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
