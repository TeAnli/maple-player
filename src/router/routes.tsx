import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import Download from "../pages/Download";
import Options from "../pages/Options";
import User from "../pages/User";
import Layout from "../layout/Layout";

import HomeIcon from "../assets/icons/Home.svg";
import SendIcon from "../assets/icons/Send.svg";
import DownloadIcon from "../assets/icons/Download.svg";
import OptionsIcon from "../assets/icons/Options.svg";

import QRCodePage from "../pages/QRCodePage";
import Search from "../pages/Search";
import FolderPage from "../pages/FolderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/download",
        element: <Download />
      },
      {
        path: "/options",
        element: <Options />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/user",
        element: <User />
      },
      {
        path: "/login",
        element: <QRCodePage />
      },
      {
        path: "/folder",
        element: <FolderPage />
      }
    ]
  }
]);
export const routes = [
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
  }
];
