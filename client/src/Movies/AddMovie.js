import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import MovieCard from './MovieCard';

const initialMovie = {
	id: '',
	title: '',
  director: '',
  metascore: '',
  stars: ''
}

const AddMovie = (props) => {
	const [movie, setMovie] = useState(initialMovie);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const history = useHistory();
	const { push } = history;

  // Handle form changes to state
  const changeHandler = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
		if (movie.title && movie.director && movie.metascore && movie.stars) {
			setIsButtonDisabled(false);
		}
  };

  // Submit changed movie data to API
  const submitHandler = (e) => {
    e.preventDefault();
		const starsArr = movie.stars.split(',');
    axios.post(`http://localhost:5000/api/movies/`, {...movie, stars: starsArr})
      .then((res) => {
        console.log(res);
        props.getMovieList();
        push(`/`);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <Form onSubmit={submitHandler} className="updateForm">
        <FormGroup className="formItem">
          <Label for="title">Title</Label>
          <Input name="title" value={movie.title} onChange={changeHandler} />
        </FormGroup>

        <FormGroup className="formItem">
          <Label for="director">Director</Label>
          <Input
            name="director"
            value={movie.director}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup className="formItem">
          <Label for="metascore">Metascore</Label>
          <Input
            name="metascore"
            value={movie.metascore}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup className="formItem">
          <Label for="stars">Stars</Label>
          <Input name="stars" value={movie.stars} onChange={changeHandler} />
        </FormGroup>

        <Button disabled={isButtonDisabled}>Save</Button>
      </Form>
    </>
  );
};

export default AddMovie;