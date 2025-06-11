import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Bottom from "./layout/Bottom";
import Content from "./layout/Content";
function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Content />
          <Bottom />
        </div>
      </div>
    </div>
  );
}

export default App;
