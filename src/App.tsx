import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Bottom from "./layout/Bottom";
import Content from "./layout/Content";

function App() {
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col h-full ml-[120px]">
        <Header />
        <div className="flex-1 overflow-hidden pt-24 pb-28">
          {/* <Content /> */}
        </div>
        <Bottom />
      </div>
    </div>
  );
}

export default App;
