import React from "react";
import { Route, Routes } from "react-router-dom";

//components
import Header from "./components/header/Header";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import MovieList from "./pages/MovieList/MovieList";

//style
import "./App.scss";

function App() {
  return (
    <div className="d-flex col-12 flex-column w-100 vh-100">
      <div className="header-min-height bg-header-color">
        <Header />
      </div>
      <div className="main-height bg-main-color h-100">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
