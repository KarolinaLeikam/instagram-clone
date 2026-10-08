import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Feed from '@/pages/Feed/Feed';
import Post from '@/pages/Post/Post';
import Profile from '@/pages/Profile/Profile';
import Login from '@/pages/Login/Login';
import SignUp from '@/pages/SignUp/SignUp';
import EditProfile from '@/pages/EditProfile/EditProfile';
import SearchUsers from '@/pages/SearchUsers/SearchUsers';
import routes from '@/utils/router';
import ProtectedLayout from './componentsProvider/ProtectedLayout';
import './styles/index.js';

const router = createBrowserRouter([
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.signup,
    element: <SignUp />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: routes.feed, element: <Feed /> },
      { path: routes.edit, element: <EditProfile /> },
      { path: routes.search, element: <SearchUsers /> },
      {
        path: routes.profileUser,
        element: <Profile />,
      },
      {
        path: routes.profileOwn,
        element: <Profile />,
      },
      {
        path: routes.post,
        element: <Post />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.login} replace />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
