import React from "react";
import logo from "../assets/ticzlogo.png";
import datas from "./headerData.json";
function Header() {
  return (
    <header className="flex flex-col justify-center items-center mt-6">
      <div className="flex items-center w-[320px] md:w-[1080px] max-h-[76px] border-[1px] border-box border-[#197686]  md:max-w-[1200px] justify-between rounded-[12px] px-3 py-4 bg-[#041e23] ">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img className="h-10 w-auto" src={logo} alt="Ticz Logo" />
        </div>
        <div className="hidden md:grid max-w-[341px] md:grid-cols-3 max-h-[34px] font-jeju gap-4  items-center text-[#b3b3b3]">
          {datas.map((data, id) => (
            <nav className=" flex items-center" key={id}>
              <a href="#" className="text-[18px] hover:text-[#197686]">
                {data.name}
              </a>
            </nav>
          ))}
        </div>
        <div className="flex items-center">
          <button className="uppercase flex font-jeju gap-[1px] items-center text-[#0A0C11] text-[1rem] bg-[#ffffff] px-6 py-4 w-[169px] h-[52px] rounded-[16px]">
            My Tickets
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
