import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
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

// createBrowserRouter сам по себе ловит ошибки внутри роутов СВОЕЙ
// границей (вот откуда "Unexpected Application Error!") и никогда не
// зовёт Sentry. wrapCreateBrowserRouter подменяет эту внутреннюю границу
// на такую, что сначала репортит ошибку в Sentry, а потом уже решает,
// что показать — обычный <Sentry.ErrorBoundary> снаружи тут не поможет,
// роутер перехватывает раньше него.
const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter([
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
