import { useCallback, useEffect, useRef } from "react";
import { useGlobalContext } from "./context";
import { FiDelete } from "react-icons/fi";

import { rows } from "./data";
const { row1, row2, row3 } = rows;

const Keyboard = () => {
  const keyRef = useRef();
  const { handleClick, setKeyCont } = useGlobalContext();

  const handleKey = useCallback(
    (e) => {
      let key = e.key;
      key = key === "Enter" ? "enter" : key;
      key = key === "Backspace" ? "delete" : key;

      if (row1.includes(key) || row2.includes(key) || row3.includes(key)) {
        handleClick(key);
      }
    },
    [handleClick]
  );

  useEffect(() => {
    setKeyCont(keyRef.current.childNodes);
  }, [setKeyCont]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <section className="keyboard" ref={keyRef}>
      <div className="key-row">
        {row1.map((key) => {
          return (
            <button key={key} onClick={() => handleClick(key)}>
              {key}
            </button>
          );
        })}
      </div>

      <div className="key-row middle">
        {row2.map((key) => {
          return (
            <button key={key} onClick={() => handleClick(key)} className={""}>
              {key}
            </button>
          );
        })}
      </div>

      <div className="key-row">
        {row3.map((key) => {
          return (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={key === "enter" || key === "delete" ? "wide" : ""}
            >
              {key === "delete" ? <FiDelete /> : key}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Keyboard;
