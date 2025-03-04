import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Profile from '@/pages/Profile';
import Collections from '@/pages/Collections';
import CollectionDetail from '@/pages/CollectionDetail';
import Settings from '@/pages/Settings';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ArtworkDetail from '@/pages/artwork/ArtworkDetail';
import NotFound from '@/pages/NotFound';
import ImageEdit from '@/pages/ai/image-edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'profile/:username',
        element: <Profile />,
      },
      {
        path: 'collections',
        element: <Collections />,
      },
      {
        path: 'collections/:id',
        element: <CollectionDetail />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'artwork/:id',
        element: <ArtworkDetail />,
      },
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'auth/register',
        element: <Register />,
      },
      {
        path: 'ai/image-edit',
        element: <ImageEdit />,
      }
    ],
  },
]);

export default router;
