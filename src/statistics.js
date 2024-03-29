import { FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { useGlobalContext } from "./context";
const array = [1, 2, 3, 4, 5, 6];

const Statistics = () => {
  const { openStat, setOpenStat, handleStart, answerRow } = useGlobalContext();

  window.addEventListener("click", (e) => {
    if (!openStat) return;
    if (e.target.className === "statistics open") {
      setOpenStat(false);
    } else return;
  });

  const stats = JSON.parse(localStorage.getItem("wordle-stats"));
  const { played, win, currentStreak, maxStreak, winState } = stats;

  const winPercent = Math.ceil((win / played) * 100)
    ? Math.ceil((win / played) * 100)
    : 0;

  const getNoOfWins = (state) => {
    const number = winState.filter((s) => s === state);
    return number.length;
  };

  return (
    <section className={openStat ? "statistics open" : "statistics"}>
      <div className="container">
        <IoMdClose className="close" onClick={() => setOpenStat(false)} />
        <h1 className="bold">Statistics</h1>
        <div className="stats">
          <div>
            <h1>{played}</h1>
            <h5>Played</h5>
          </div>
          <div>
            <h1>{winPercent}</h1>
            <h5>Win %</h5>
          </div>
          <div>
            <h1>{currentStreak}</h1>
            <h5>Current Streak</h5>
          </div>
          <div>
            <h1>{maxStreak}</h1>
            <h5>Max Streak</h5>
          </div>
        </div>
        <div className={stats ? "dist" : "dist empty"}>
          <h1 className="bold">Guess Distribution</h1>
          <div className="articles">
            {array.map((item, index) => (
              <article key={item}>
                <span>{item}</span>{" "}
                <span className={item === answerRow ? "no correct" : "no"}>
                  {getNoOfWins(index)}
                </span>
              </article>
            ))}
          </div>
          {answerRow && (
            <div className="next">
              <div className="wordle">
                <h2>Next wordle</h2>
                <h1>00:00:00</h1>
              </div>
              <div className="share">
                <button className="share-btn" onClick={handleStart}>
                  New game
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="play">
          <img src="" alt="" />
          <div>
            <h4>How many words can you find using 7 letters?</h4>
            <h3>Play Spelling Bee</h3>
          </div>
          <FaArrowRight />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
