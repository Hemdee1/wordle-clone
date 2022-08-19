import wordExists from "word-exists";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { rows } from "./data";
import { fiveLetterWords } from "./data";
import validator from "validator";
const { row1, row2, row3 } = rows;

const AppContext = React.createContext();

// GETTING THE WORDLE FROM LOCAL STORAGE

if (!localStorage.getItem("wordle")) {
  localStorage.setItem(
    "wordle",
    JSON.stringify({
      state: 0,
      contrast: false,
      dark: false,
      solution:
        fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)],
      values: [[], [], [], [], [], []],
    })
  );
}

if (!localStorage.getItem("wordle-stats")) {
  localStorage.setItem(
    "wordle-stats",
    JSON.stringify({
      played: 0,
      win: 0,
      currentStreak: 0,
      maxStreak: 0,
      winState: [],
    })
  );
}

const AppProvider = ({ children }) => {
  // UPDATING LOCAL STORAGE
  const updateLs = (wordle) => {
    localStorage.setItem("wordle", JSON.stringify(wordle));
  };

  const updateStatsLs = (stats) => {
    localStorage.setItem("wordle-stats", JSON.stringify(stats));
  };

  // GET LOCAL STORAGE
  const getLs = () => {
    return JSON.parse(localStorage.getItem("wordle"));
  };

  const getStatsLS = () => {
    return JSON.parse(localStorage.getItem("wordle-stats"));
  };

  // ***************
  // ***************
  //  STATES
  // ***************
  // ***************

  const [solution] = useState(getLs().solution);
  const [values, setValues] = useState(getLs().values);
  const [state, setState] = useState(getLs().state);
  const [notif, setNotif] = useState("");
  const [tileCont, setTileCont] = useState();
  const [keyCont, setKeyCont] = useState();

  const [closeKey, setCloseKey] = useState(false);
  const [answerRow, setAnswerRow] = useState("");

  // Navigation states
  const [openOption, setOpenOption] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openStat, setOpenStat] = useState(false);
  const [openTutorial, setOpenTutorial] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  // For settings
  // const [hardMode, setHardMode] = useState(false);
  const [darkMode, setDarkMode] = useState(getLs().dark);
  const [contrastMode, setContrastMode] = useState(getLs().contrast);

  // CHECKING IF IT'S THE FIRST TIME AND SHOWING TUTORIAL
  if (!localStorage.getItem("wordle")) {
    setTimeout(() => {
      setOpenTutorial(true);
    }, 1000);
  }

  // ***************
  // ***************
  //  FUNCTIONS
  // ***************
  // ***************

  // ADDING A NEW WORD
  const checkTileValue = (row, index) => {
    if (values[row][index - 1] !== undefined) {
      return "word";
    }

    return "";
  };

  // SHOWING NOTIFICATION
  const showNotif = useCallback(
    (value, shake = true) => {
      setNotif(value);
      setOpenNotif(true);

      if (shake) {
        tileCont[state]?.classList.add("shake");

        setTimeout(() => {
          setOpenNotif(false);
          tileCont[state]?.classList.remove("shake");
        }, 1000);
      }
    },
    [state, tileCont]
  );

  // FOR NEW GAME BUTTON
  const handleStart = () => {
    const wordle = {
      ...getLs(),
      state: 0,
      solution:
        fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)],
      values: [[], [], [], [], [], []],
    };

    updateLs(wordle);
    window.location.reload();
  };

  // VALIDATE TILES AND KEYS VALUES
  const validateValue = useCallback(
    (state, refresh = false) => {
      //  Validating for tiles
      const value = values[state];
      const word = values[state].join("");
      const tileRow = tileCont ? tileCont[state]?.children : "";

      // flipping the cards
      if (tileCont) tileCont[state]?.classList.add("flip");

      // locking the keyboard
      setCloseKey(true);
      setTimeout(() => {
        setCloseKey(false);
      }, 1400);

      // giving classes to the tiles for animation
      const giveClass = (i) => {
        if (value[i] === solution[i]) {
          tileRow[i]?.classList.add("correct");
        } else if (solution.includes(value[i])) {
          // check if the letter hasn't appear already
          validateLetter(i);

          tileRow[i]?.classList.add("present");
        } else if (!solution.includes(value[i])) {
          tileRow[i]?.classList.add("absent");
        }
      };

      let checkFirst = true;
      function validateLetter(i) {
        // check if the letter appear twice and also in the solution twice
        if (
          validator.contains(solution, value[i], {
            minOccurrences: 2,
          }) &&
          value[i] !== solution[i]
        ) {
          tileRow[i]?.classList.add("present");
          return;
        }

        // check if the letter appear twice but in the solution once
        if (
          validator.contains(value.join(""), value[i], {
            minOccurrences: 2,
          }) &&
          value[i] !== solution[i]
        ) {
          // check if the answer come before the solution
          if (solution.indexOf(value[i]) > value.indexOf(value[i])) {
            tileRow[i]?.classList.add("absent");
          }
          if (!checkFirst) {
            tileRow[i]?.classList.add("absent");
          }
          tileRow[i]?.classList.add("present");
          checkFirst = false;

          return;
        }
      }

      // adding delay for the animation
      for (let i = 0; i < 5; i++) {
        const delay = 250;

        if (i === 0) setTimeout(giveClass, delay * (i + 1), i);
        if (i === 1) setTimeout(giveClass, delay * (i + 1), i);
        if (i === 2) setTimeout(giveClass, delay * (i + 1), i);
        if (i === 3) setTimeout(giveClass, delay * (i + 1), i);
        if (i === 4) setTimeout(giveClass, delay * (i + 1), i);
      }

      //  Validating For keyboards
      const giveKeyClass = (row, rowIndex) => {
        row.forEach((item, index) => {
          const value = values[state];
          const keyRow = keyCont ? keyCont[rowIndex]?.children : "";

          for (let i = 0; i < 5; i++) {
            if (item === value[i]) {
              if (item === solution[i]) {
                keyRow[index]?.classList.add("correct");
              } else if (solution.includes(item)) {
                keyRow[index]?.classList.add("present");
              } else if (!solution.includes(item)) {
                keyRow[index]?.classList.add("absent");
              }
            }
          }
        });
      };

      // adding delay for the tile animation
      setTimeout(() => {
        giveKeyClass(row1, 0);
        giveKeyClass(row2, 1);
        giveKeyClass(row3, 2);
      }, 1400);

      // checking if the answer is correct
      if (word === solution) {
        setTimeout(() => {
          if (tileCont) tileCont[state]?.classList.add("answer");
          setCloseKey(true);
        }, 1500);

        setTimeout(() => {
          showNotif(returnLevel(), false);

          // update stats in local storage
          if (refresh) return;
          console.log(refresh);
          const pre = getStatsLS();
          const stats = {
            played: pre.played + 1,
            win: pre.win + 1,
            currentStreak: pre.currentStreak + 1,
            maxStreak:
              pre.currentStreak === pre.maxStreak
                ? pre.currentStreak + 1
                : pre.maxStreak,
            winState: [...pre.winState, state],
          };
          updateStatsLs(stats);
        }, 2000);

        setTimeout(() => {
          setAnswerRow(state + 1);
          setOpenStat(true);
        }, 2500);

        function returnLevel() {
          if (state === 0) return "Genius";
          if (state === 1) return "Magnificent";
          if (state === 2) return "Impressive";
          if (state === 3) return "Splendid";
          if (state === 4) return "Great";
          if (state === 5) return "Phew";
        }
      }

      // checking if there is no answer
      if (state === 5 && word !== solution) {
        setAnswerRow("a");

        setTimeout(() => {
          showNotif("RETRO", false);

          // update stats in local storage
          if (refresh) return;
          const pre = getStatsLS();
          const stats = { ...pre, played: pre.played + 1, currentStreak: 0 };
          updateStatsLs(stats);
        }, 200);

        setTimeout(() => {
          setOpenStat(true);
        }, 1500);
      }
    },
    [keyCont, solution, tileCont, values, showNotif]
  );

  // HANDLE KEY INPUTS
  const handleClick = (key) => {
    if (closeKey) return;

    if (state > 5) return;

    // for enter key
    if (key === "enter") {
      // checking if it's a five words
      if (values[state].length === 5) {
        // checking if it's a valid five words
        const word = values[state].join("");
        if (wordExists(word)) {
          validateValue(state);
          setState((prev) => prev + 1);

          // save to local storage
          const wordle = { ...getLs(), values, state: state + 1 };
          updateLs(wordle);
        } else {
          // trigger an error
          showNotif("Not in word list");
        }
      } else {
        showNotif("Not enough letters");
      }
      return;
    }

    // for delete key
    if (key === "delete") {
      if (values[state].length < 1) return;

      setValues(
        values.map((item, index) => {
          if (index === state) {
            const newItem = item.splice(0, item.length - 1);
            return newItem;
          } else {
            return item;
          }
        })
      );
      return;
    }

    // for the other keys
    if (values[state].length === 5) return;

    setValues(
      values.map((item, index) => {
        if (index === state) {
          return [...item, key];
        }

        return item;
      })
    );
  };

  // UPDATING DARK MODE
  const updateDarkMode = useCallback(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    // updating the local storage
    const wordle = {
      ...getLs(),
      dark: darkMode,
    };
    updateLs(wordle);
  }, [darkMode]);

  // UPDATING CONTRAST MODE
  const updateContrastMode = useCallback(() => {
    if (contrastMode) {
      document.documentElement.classList.add("contrast");
    } else {
      document.documentElement.classList.remove("contrast");
    }

    // updating the local storage
    const wordle = {
      ...getLs(),
      contrast: contrastMode,
    };
    updateLs(wordle);
  }, [contrastMode]);

  useEffect(() => {
    updateDarkMode();
  }, [updateDarkMode]);

  useEffect(() => {
    updateContrastMode();
  }, [updateContrastMode]);

  // VALIDATING VALUES ON REFRESH
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      if (tileCont) {
        if (getLs().values[i].length > 1) {
          validateValue(i, true);
        }
      }
    }
    /* eslint-disable */
  }, [tileCont]);

  return (
    <AppContext.Provider
      value={{
        checkTileValue,
        handleClick,
        values,
        setTileCont,
        openOption,
        setOpenOption,
        openSettings,
        setOpenSettings,
        darkMode,
        setDarkMode,
        contrastMode,
        setContrastMode,
        openStat,
        setOpenStat,
        openTutorial,
        setOpenTutorial,
        keyCont,
        setKeyCont,
        notif,
        openNotif,
        handleStart,
        answerRow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
