import { FaBars } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

function Navbar() {
  return (
    <nav className="flex flex-wrap justify-between px-4 py-2 border-b border-[#3A3A3C] font-semibold font-sans tracking-tighter items-center">
      <div className="inline-flex flex-row">
        <a>
          <FaBars className="w-[1.375rem] h-[1.375rem]" />
        </a>
        <a>
          <BsQuestionCircle className="w-[1.375rem] h-[1.375rem] ml-2" />
        </a>
      </div>
      <h1 className="text-3xl">Wordle</h1>
      <div className="inline-flex flex-row">
        <a>
          <BiBarChartAlt2 className="w-[1.375rem] h-[1.375rem]" />
        </a>
        <a>
          <IoMdSettings className="w-[1.375rem] h-[1.375rem] ml-2" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
