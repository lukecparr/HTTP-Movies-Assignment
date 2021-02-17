import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import MovieCard from "./MovieCard";

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const { push } = history;

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteHandler = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        props.getMovieList();
        push('/')
      })
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <Button color="success" className="save-button" onClick={saveMovie}>Save</Button>
      <Button color="warning" className="edit-button" onClick={() => {push(`/update-movie/${params.id}`)}}>Edit</Button>
      <Button color="danger" className="delete-button" onClick={deleteHandler}>Delete</Button>

    </div>
  );
}

export default Movie;
