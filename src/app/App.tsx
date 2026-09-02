import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Feed from '@/pages/Feed/Feed';
import ProfileProvider from '@/app/componentsProvider/ProfileProvider.js';
import Post from '@/pages/Post/Post';
import Login from '@/pages/Login/Login.js';
import SignUp from '@/pages/SignUp/SignUp';
import EditProfile from '@/pages/EditProfile/EditProfile';
import SearchUsers from '@/pages/SearchUsers/SearchUsers.js';
import { GetAllPosts } from '@/context/GetAllPosts';
import routes from '@/utils/router.js';
import ProtectedLayout from './componentsProvider/ProtectedLayout.js';

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
      { path: routes.signup, element: <Feed /> },
      { path: routes.edit, element: <EditProfile /> },
      { path: routes.search, element: <SearchUsers /> },
      {
        path: routes.profileUser,
        element: <ProfileProvider />,
      },
      {
        path: routes.profileOwn,
        element: <ProfileProvider />,
      },
      {
        path: routes.post,
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
    element: <Navigate to={routes.login} replace />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
