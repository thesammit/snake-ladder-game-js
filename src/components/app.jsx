import { useEffect, useState } from "react";
import { getMasterData, populateData } from "../data/snake-ladder-data";
import { AppContextProvider } from "./app-context";
import Game from "./game/game";


function App() {
  const [masterData, setMasterData] = useState(null);
  useEffect(() => {
    populateData();
    setMasterData(getMasterData());
  }, []);
  return (
    <>
      <div className="alert-global-container" id="alert-global-container"></div>
      {masterData &&
        <AppContextProvider data={masterData}>
          <Game />
        </AppContextProvider>}
    </>
  );
}

export default App;
