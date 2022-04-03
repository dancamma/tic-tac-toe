import { useEffect } from "react";
import WebFont from "webfontloader";

import { TicTacToe } from "./components/pages/TicTacToe";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
  }, []);
  return <TicTacToe />;
}

export default App;
