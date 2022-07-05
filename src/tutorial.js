import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "./context";
const array1 = ["w", "e", "a", "r", "y"];
const array2 = ["p", "i", "l", "l", "s"];
const array3 = ["v", "a", "g", "u", "e"];

const Tutorial = () => {
  const { openTutorial, setOpenTutorial } = useGlobalContext();

  return (
    <section className={openTutorial ? "tutorial open" : "tutorial"}>
      <div className="container">
        <div className="header">
          <div></div>
          <h1>How to Play</h1>
          <IoMdClose onClick={() => setOpenTutorial(false)} />
        </div>
        <div className="exp">
          <p>
            Guess the <span>Wordle</span> in six tries.
          </p>
          <p>
            Each guess must be a valid five-letter word. Hit the enter button to
            submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>
        <div className={openTutorial ? "exa open" : "exa"}>
          <h5>Examples</h5>

          <div className="row one">
            {array1.map((item, index) => (
              <div key={index} className="tiles">
                {item}
              </div>
            ))}
          </div>
          <p>
            The letter <span>W</span> is in the word and in the correct spot.
          </p>

          <div className="row two">
            {array2.map((item, index) => (
              <div key={index} className="tiles">
                {item}
              </div>
            ))}
          </div>
          <p>
            The letter <span>I</span> is in the word but in the wrong spot.
          </p>

          <div className="row three">
            {array3.map((item, index) => (
              <div key={index} className="tiles">
                {item}
              </div>
            ))}
          </div>
          <p>
            The letter <span>U</span> is not in the word in any spot.
          </p>
        </div>
        <h5 className="footer">
          A new <span>WORDLE</span> will be available each day!
        </h5>
      </div>
    </section>
  );
};

export default Tutorial;
