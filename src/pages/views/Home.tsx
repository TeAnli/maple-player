import React, { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import { invoke } from "@tauri-apps/api/core";

interface Response {
  code: number;
  data: Data;
}
interface Data {
  data: Array<Item>;
}
interface Item {
  title: string;
  uname: string;
  cover: string;
}

const Home: React.FC = () => {

  return (<></>);
};

export default Home;
