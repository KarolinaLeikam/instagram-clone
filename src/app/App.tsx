import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from '@/pages/Feed/Feed';
import Profile from '@/pages/Profile/Profile';
import './styles/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
