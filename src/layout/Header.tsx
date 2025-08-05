import { getCurrentWindow } from "@tauri-apps/api/window";
import { useNavigate } from "react-router";
import Button from "../components/common/Button";
import CloseIcon from "../assets/icons/Close.svg";
import Search from "../pages/Search.tsx";
import InputField from "../components/common/InputField.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const closeWindow = () => {
    let window = getCurrentWindow();
    window.close();
  };

  return (
    <div className="w-full fade-in-down">
      <div
        className="w-full flex justify-between items-center p-4"
        data-tauri-drag-region
      >
        <section className="space-x-4">
          <Button color="border"
            onClick={() => {
              navigate(-1);
            }}
          >
            {"<"}
          </Button>
          <Button color="border"
            onClick={() => {
              navigate("login");
            }}
          >
            登录
          </Button>

        </section>
        <section>
          <InputField>

          </InputField>
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
