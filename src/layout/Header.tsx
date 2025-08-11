import Search from "../components/common/Search.tsx";

const Header: React.FC = () => {
  return (
    <div data-tauri-drag-region className="flex items-center justify-center w-full fade-in-down px-7 py-4 gap-2">
      <div className="w-full flex items-center h-16 py-8 px-4" data-tauri-drag-region>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 17 17"
          fill="none"
        >
          <path
            d="M14.1317 12.5518L17.6717 16.0818C18.1091 16.521 18.1091 17.2326 17.6717 17.6718C17.2325 18.1092 16.5209 18.1092 16.0817 17.6718L12.5517 14.1318C9.47191 16.434 5.09891 16.2208 2.30171 13.4218C-0.767291 10.3528 -0.767291 5.37257 2.30171 2.30177C5.37071 -0.76723 10.3527 -0.76723 13.4217 2.30177C16.2207 5.09897 16.4339 9.47197 14.1317 12.5518ZM3.89751 11.8376C1.70411 9.64417 1.70411 6.09097 3.89751 3.89757C6.09091 1.70417 9.64411 1.70417 11.8375 3.89757C14.0309 6.09097 14.0309 9.64417 11.8375 11.8376C9.64411 14.031 6.09091 14.031 3.89751 11.8376Z"
            fillRule="evenodd"
            fill="gray"
          ></path>
        </svg>

        <Search placeholder="搜索视频"></Search>
      </div>
    </div>
  );
};

export default Header;
