import React from "react";
import { Route, Routes } from "react-router";

// import global css
import "./styles/global.scss";

// import Page
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
