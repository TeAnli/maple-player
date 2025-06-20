import { createBrowserRouter } from 'react-router';

import Home from '../pages/views/Home';
import Download from '../pages/views/Download';
import Options from '../pages/views/Options';
import User from '../pages/views/User';
import Layout from '../layout/Layout';

import HomeIcon from '../assets/Home.svg';
import SendIcon from '../assets/Send.svg';
import DownloadIcon from '../assets/Download.svg';
import OptionsIcon from '../assets/Options.svg';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/download',
        element: <Download />,
      },
      {
        path: '/options',
        element: <Options />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
]);

export const routes = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    icon: HomeIcon,
  },
  {
    id: 'user',
    path: '/user',
    label: 'User',
    icon: SendIcon,
  },
  {
    id: 'download',
    path: '/download',
    label: 'Download',
    icon: DownloadIcon,
  },
  {
    id: 'options',
    path: '/options',
    label: 'Options',
    icon: OptionsIcon,
  },
]; 