import { FaBars, FaRegQuestionCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { useGlobalContext } from "./context";

const Header = () => {
  const { setOpenOption, setOpenSettings, setOpenStat, setOpenTutorial } =
    useGlobalContext();

  return (
    <header>
      <div className="option">
        <FaBars onClick={() => setOpenOption((prev) => !prev)} />
        <FaRegQuestionCircle onClick={() => setOpenTutorial(true)} />
      </div>
      <h1>Wordle</h1>
      <div className="option">
        <BiBarChartAlt2 onClick={() => setOpenStat(true)} />
        <IoMdSettings onClick={() => setOpenSettings(true)} />
      </div>
    </header>
  );
};

export default Header;
