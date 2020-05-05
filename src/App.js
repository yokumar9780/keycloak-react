import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Secured from "./Secured";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route path="/" component={Secured} />
      </div>
    </BrowserRouter>
  );
}

export default App;
