import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  searchType,
  searchYear,
  setFilterValue,
  setIsSearch,
  setName,
  setPaginationStarted,
  setType,
} from "../../features/movies/movieListSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.scss";

export const mockYear = [
  { value: 2000, text: "2000" },
  { value: 2001, text: "2001" },
  { value: 2002, text: "2002" },
  { value: 2003, text: "2003" },
  { value: 2004, text: "2004" },
  { value: 2005, text: "2005" },
  { value: 2006, text: "2006" },
  { value: 2007, text: "2007" },
  { value: 2008, text: "2008" },
  { value: 2009, text: "2009" },
  { value: 2010, text: "2010" },
  { value: 2011, text: "2011" },
  { value: 2012, text: "2012" },
  { value: 2013, text: "2013" },
  { value: 2014, text: "2014" },
  { value: 2015, text: "2015" },
  { value: 2016, text: "2016" },
  { value: 2017, text: "2017" },
  { value: 2018, text: "2018" },
  { value: 2019, text: "2019" },
  { value: 2020, text: "2020" },
  { value: 2021, text: "2021" },
  { value: 2022, text: "2022" },
];

const Search = () => {
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
      setSearchTypeParams({ name: moviesSearch, type: "movie" });
      dispatch(setName(moviesSearch));
      dispatch(setType("movie"));
    } else if (filterSelect === 2) {
      setSearchTypeParams({ name: seriesSearch, type: "series" });
      dispatch(setName(seriesSearch));
      dispatch(setType("series"));
    } else if (filterSelect === 3) {
      setSearchTypeParams({ name: seriesEpisodeSearch, type: "episode" });
      dispatch(setName(seriesEpisodeSearch));
      dispatch(setType("episode"));
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
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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
                id="demo-simple-select-helper"
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
                }}
              >
                Ara
              </Button>
              <Button
                className="ms-3 reset-button"
                variant="contained"
                onClick={() => {
                  clearState();
                  dispatch(setName("pokemon"));
                  dispatch(fetchMovies({ pageIndex: 1 }));
                  dispatch(setPaginationStarted(0));
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
