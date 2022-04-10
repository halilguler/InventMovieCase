import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMovies,
  searchType,
  searchYear,
  setName,
  setType,
} from "../../features/movies/movieListSlice";

//mockData

import { mockYear } from "./mockYear";

//3rd party package
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// style
import "./style.scss";
import { movieFilterOptionEnum } from "../../enums/MovieFilterOptionEnum";

const Search = ({ clearPage }) => {
  const [filterSelect, setFilterSelect] = useState(0);
  const [year, setYear] = useState(null);
  const [moviesSearch, setMoviesSearch] = useState("");
  const [seriesSearch, setSeriesSearch] = useState("");
  const [seriesEpisodeSearch, setSeriesEpisodeSearch] = useState("");
  const dispatch = useDispatch();
  const [searchYearParams, setSearchYearParams] = useState({
    name: "",
    year: "",
  });
  const [searchTypeParams, setSearchTypeParams] = useState({
    name: "",
    type: "",
  });

  useEffect(() => {
    /*tek başına yıl vizyondakiler gelmiyor yinede query isteğini gönderdim..*/
    searchYearParams.year && dispatch(searchYear(searchYearParams));
  }, [searchYearParams]);

  useEffect(() => {
    searchTypeParams.name &&
      searchTypeParams.type &&
      dispatch(searchType(searchTypeParams));
  }, [searchTypeParams]);

  const handleSubmit = (e) => {
    if (filterSelect === 1) {
      setSearchTypeParams({
        name: moviesSearch,
        type: movieFilterOptionEnum.JUST_MOVIE,
      });
      dispatch(setName(moviesSearch));
      dispatch(setType(movieFilterOptionEnum.JUST_MOVIE));
    } else if (filterSelect === 2) {
      setSearchTypeParams({
        name: seriesSearch,
        type: movieFilterOptionEnum.JUST_SERIES,
      });
      dispatch(setName(seriesSearch));
      dispatch(setType(movieFilterOptionEnum.JUST_SERIES));
    } else if (filterSelect === 3) {
      setSearchTypeParams({
        name: seriesEpisodeSearch,
        type: movieFilterOptionEnum.JUST_SERIES_SEASON,
      });
      dispatch(setName(seriesEpisodeSearch));
      dispatch(setType(movieFilterOptionEnum.JUST_SERIES_SEASON));
    } else if (filterSelect === 4) {
      setSearchYearParams({ year: year });
    }
  };

  const clearState = () => {
    setMoviesSearch("");
    setSeriesSearch("");
    setSeriesEpisodeSearch("");
    setFilterSelect(0);
    setYear(null);
  };

  const handleChangeSelect = (event) => {
    setFilterSelect(event.target.value);
  };

  const switchComponentDisplay = (status) => {
    switch (status) {
      case 1:
        return (
          <TextField
            id="outlined-basic-1"
            label="Filme Göre"
            value={moviesSearch}
            onChange={(e) => {
              setMoviesSearch(e.target.value);
            }}
          />
        );
        break;
      case 2:
        return (
          <TextField
            id="outlined-basic-2"
            label="Diziye Göre"
            value={seriesSearch}
            onChange={(e) => {
              setSeriesSearch(e.target.value);
            }}
          />
        );
        break;
      case 3:
        return (
          <TextField
            id="outlined-basic-3"
            label="Dizi Bölümüne Göre"
            value={seriesEpisodeSearch}
            onChange={(e) => {
              setSeriesEpisodeSearch(e.target.value);
            }}
          />
        );
        break;
      case 4:
        return (
          <>
            <FormControl className="d-flex col-6">
              <InputLabel className="">Yıl</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper-1"
                value={year}
                label="Yıl"
                onChange={(e) => setYear(e.target.value)}
              >
                {mockYear.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    <span>{item.text}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );

      default:
        <></>;
    }
  };

  return (
    <>
      <div className="d-flex col-9 p-4">
        <div className="d-flex align-items-center col-10">
          <FormControl className="d-flex col-6">
            <InputLabel className="d-flex col-8">Özel Arama</InputLabel>
            <Select
              labelId="select-filter"
              id="select-filter"
              value={filterSelect}
              label="Türe göre arama"
              onChange={(e) => handleChangeSelect(e)}
            >
              {/* map ile dönülüp optionlar verilebilirdi.*/}
              <MenuItem value={0}>Seçiniz</MenuItem>
              <MenuItem value={1}>Sadece Film</MenuItem>
              <MenuItem value={2}>Sadece Dizi</MenuItem>
              <MenuItem value={3}>Sadece Dizi Bölümleri</MenuItem>
              <MenuItem value={4}>Yıl</MenuItem>
            </Select>
          </FormControl>

          {filterSelect !== 0 && filterSelect !== "" && (
            <>
              <div className="col-3 ms-3">
                {switchComponentDisplay(filterSelect)}
              </div>
              <Button
                className="ms-3 submit-button"
                variant="contained"
                onClick={() => {
                  handleSubmit();
                  clearPage();
                }}
              >
                Ara
              </Button>
              <Button
                className="ms-3 reset-button"
                variant="contained"
                onClick={() => {
                  clearState();
                  clearPage();
                  dispatch(setName("pokemon"));
                  dispatch(fetchMovies({ pageIndex: 1 }));
                }}
              >
                Sıfırla
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
