import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Home } from '@/pages/Home';
import { Explore } from '@/pages/explore/Explore';
import { ProfilePage } from '@/pages/ProfilePage';
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { ArtworkDetail } from '@/pages/artwork/ArtworkDetail';
import { NotFound } from '@/pages/NotFound';
import Gallery from '@/pages/Gallery';
import Profile from '@/pages/Profile';

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
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/artwork/:id',
        element: <ArtworkDetail />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default router;
