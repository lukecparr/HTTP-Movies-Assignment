import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';

import UpdateMovie from './Movies/UpdateMovie';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import AddMovie from './Movies/AddMovie';
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie getMovieList={getMovieList} addToSavedList={addToSavedList} />
      </Route>
      
      <Route path="/update-movie/:id">
        <UpdateMovie getMovieList={getMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovie getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
