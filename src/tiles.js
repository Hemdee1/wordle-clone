import { useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const array = [1, 2, 3, 4, 5];

const Tiles = () => {
  const { checkTileValue, values, setTileCont } = useGlobalContext();
  const tileRef = useRef();

  useEffect(() => {
    setTileCont(tileRef.current.childNodes);
  }, [setTileCont]);

  return (
    <main ref={tileRef}>
      <div className="row">
        {array.map((index) => (
          <div key={index} className={"tile " + checkTileValue(0, index)}>
            {values[0][index - 1] ? values[0][index - 1] : ""}
          </div>
        ))}
      </div>

      <div className="row">
        {array.map((index) => (
          <div key={index} className={"tile " + checkTileValue(1, index)}>
            {values[1][index - 1] ? values[1][index - 1] : ""}
          </div>
        ))}
      </div>
      <div className="row">
        {array.map((index) => (
          <div key={index} className={"tile " + checkTileValue(2, index)}>
            {values[2][index - 1] ? values[2][index - 1] : ""}
          </div>
        ))}
      </div>
      <div className="row">
        {array.map((index) => (
          <div key={index} className={"tile " + checkTileValue(3, index)}>
            {values[3][index - 1] ? values[3][index - 1] : ""}
          </div>
        ))}
      </div>
      <div className="row">
        {array.map((index) => (
          <div key={index} className={"tile " + checkTileValue(4, index)}>
            {values[4][index - 1] ? values[4][index - 1] : ""}
          </div>
        ))}
      </div>
      <div className="row">
        {array.map((index) => (
          <div key={index} className={"tile " + checkTileValue(5, index)}>
            {values[5][index - 1] ? values[5][index - 1] : ""}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Tiles;
