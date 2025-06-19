import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Bottom from "./layout/Bottom";
import Content from "./layout/Content";

function App() {
  return (
    <div className="w-full h-screen overflow-hidden ">
      <Sidebar />
      <div className="flex flex-col h-full ml-[120px]">
        <Header />
        <div className="flex overflow-hidden pt-24 pb-24">
          <Content />
        </div>
        <Bottom />
      </div>
    </div>
  );
}

export default App;
