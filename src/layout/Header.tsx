import { getCurrentWindow } from "@tauri-apps/api/window";
import { useNavigate } from "react-router";
import Button from "../components/common/Button";
import CloseIcon from "../assets/icons/Close.svg";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const closeWindow = () => {
    let window = getCurrentWindow();
    window.close();
  };

  return (
    <div className="w-full py-4 px-4 fade-in-down">
      <div
        className="w-full flex justify-between items-center bg-foreground rounded-lg border border-neutral-700 p-2"
        data-tauri-drag-region
      >
        <section className="space-x-4">
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => {
              navigate("login");
            }}
          >
            登录
          </Button>
        </section>
        <section>
          <img
            src={CloseIcon}
            className="opcity-100 size-8 cursor-pointer"
            onClick={closeWindow}
          ></img>
        </section>
      </div>
    </div>
  );
};

export default Header;
