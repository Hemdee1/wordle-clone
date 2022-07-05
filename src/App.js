import Header from "./header";
import Main from "./main";
import Notif from "./notif";
import Options from "./options";
import Settings from "./settings";
import Statistics from "./statistics";
import Tutorial from "./tutorial";

const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Options />
      <Settings />
      <Statistics />
      <Tutorial />
      <Notif />
    </>
  );
};

export default App;
