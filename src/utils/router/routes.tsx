import { createBrowserRouter } from "react-router";

import Home from "../../pages/views/Home";
import Download from "../../pages/views/Download";
import Options from "../../pages/views/Options";
import User from "../../pages/views/User";
import Layout from "../../layout/Layout";

import HomeIcon from "../../assets/Home.svg";
import SendIcon from "../../assets/Send.svg";
import DownloadIcon from "../../assets/Download.svg";
import OptionsIcon from "../../assets/Options.svg";
import QRCodePage from "../../pages/views/QRCodePage";
import Search from "../../pages/views/Search";


//the Layout component control the other page component
//Home, User, Options, User is the child page of Layout
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/download",
        element: <Download />,
      },
      {
        path: "/options",
        element: <Options />,
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/login",
        element: <QRCodePage />
      },
    ],
  },


]);
// the array provide routes' field for sidebar 
export const routes = [
  {
    id: "home",
    path: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    id: "user",
    path: "/user",
    label: "User",
    icon: SendIcon,
  },
  {
    id: "download",
    path: "/download",
    label: "Download",
    icon: DownloadIcon,
  },
  {
    id: "options",
    path: "/options",
    label: "Options",
    icon: OptionsIcon,
  },
];
