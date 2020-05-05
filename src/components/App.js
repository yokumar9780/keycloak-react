import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Secured from "./Secured";
import "../App.css";

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
