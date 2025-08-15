import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import DownloadPage from "../pages/DownloadPage";
import LyricsPage from "../pages/LyricsPage";
import UserPage from "../pages/UserPage";
import Layout from "../layout/Layout";

import HomeIcon from "../assets/icons/Home.svg";
import SendIcon from "../assets/icons/Send.svg";
import DownloadIcon from "../assets/icons/Download.svg";
import OptionsIcon from "../assets/icons/Options.svg";
import LoginIcon from "../assets/icons/Auth.svg";
import LogoutIcon from "../assets/icons/Logout.svg";

import QRCodePage from "../pages/QRCodePage";
import FolderPage from "../pages/FolderPage";
import SearchPage from "@/pages/SearchPage";
import OptionsPage from "@/pages/OptionsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/folder",
        element: <FolderPage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/download",
        element: <DownloadPage />
      },
      {
        path: "/lyric",
        element: <LyricsPage />
      },
      {
        path: "/options",
        element: <OptionsPage />
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/login",
        element: <QRCodePage />
      },

    ]
  }
]);
export const mainRoutes = [
  {
    id: "home",
    path: "/",
    label: "Home",
    icon: HomeIcon
  },
  {
    id: "user",
    path: "/user",
    label: "User",
    icon: SendIcon
  },
  {
    id: "download",
    path: "/download",
    label: "Download",
    icon: DownloadIcon
  },
  {
    id: "options",
    path: "/options",
    label: "Options",
    icon: OptionsIcon
  },

];
export const authRoutes = [
  {
    id: "login",
    path: "/login",
    label: "Login",
    icon: LoginIcon
  },
  {
    id: "logout",
    path: "/logout",
    label: "Logout",
    icon: LogoutIcon
  }
];
