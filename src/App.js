import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import Search from "./components/search/Search";

function App() {
  const { movies, loading } = useSelector((state) => state.movies);
  const [moviesState, setMoviesState] = useState(movies);
  const dispatch = useDispatch();

  return (
    <div className="d-flex col-12 flex-column w-100 h-100">
      <div className="header-min-height">
        <Header />
      </div>
      <div className="layout">
        <Layout />
      </div>
      <div className="footer-min-height">
        <Footer />
      </div>
    </div>
  );
}

export default App;
