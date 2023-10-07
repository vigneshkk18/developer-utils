import { Route } from "wouter";

import { Header } from "./components/header";
import { ColorCodeConvertor } from "./components/color-code-convertor";

const App = () => {
  return (
    <>
      <Header />
      <Route path="/color-code-convertor">
        <ColorCodeConvertor />
      </Route>
    </>
  );
};

export default App;
