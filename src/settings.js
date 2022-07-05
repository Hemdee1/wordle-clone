import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "./context";

const Settings = () => {
  const {
    darkMode,
    setDarkMode,
    contrastMode,
    setContrastMode,
    openSettings,
    setOpenSettings,
  } = useGlobalContext();

  return (
    <section className={openSettings ? "settings open" : "settings"}>
      <div className="container">
        <div className="header">
          <div></div>
          <h1>Settings</h1>
          <IoMdClose onClick={() => setOpenSettings(false)} />
        </div>
        <article>
          <div>
            <h2>Hard Mode</h2>
            <p>Any revealed hints must be used in subsequent guesses</p>
          </div>
          <div className="btn closed">
            <div></div>
          </div>
        </article>
        <article>
          <h2>Dark Theme</h2>
          <div
            className={darkMode ? "btn open" : "btn"}
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <div></div>
          </div>
        </article>
        <article>
          <div>
            <h2>High Contrast Mode</h2>
            <p>For improved color vision</p>
          </div>
          <div
            className={contrastMode ? "btn open" : "btn"}
            onClick={() => setContrastMode((prev) => !prev)}
          >
            <div></div>
          </div>
        </article>
        <article>
          <h2>Feedback</h2>
          <a href="/">Email</a>
        </article>
        <article>
          <h2>Community</h2>
          <a href="/">Twitter</a>
        </article>
        <article>
          <h2>Questions?</h2>
          <a href="/">FAQ</a>
        </article>

        <footer>
          <span>&copy; 2022 The new york times company</span>
          <span>#363</span>
        </footer>
      </div>
    </section>
  );
};

export default Settings;
