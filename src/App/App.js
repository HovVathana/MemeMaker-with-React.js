import React from "react";
import { Route, Switch } from "react-router";
import { Meme } from "../Meme/Meme";
import { MemeGenerator } from "../MemeGenerator/MemeGenerator";

export const App = () => {
  return (
    <div>
      <h1>MAKE MEME</h1>
      <p>VATHANA</p>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <MemeGenerator />
        </Route>
      </Switch>
    </div>
  );
};
