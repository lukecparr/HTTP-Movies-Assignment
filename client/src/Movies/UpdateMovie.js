import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


const initialMovie = {
	id: '',
	title: '',
  director: '',
  metascore: '',
  stars: ['']
}

const UpdateMovie = (props) => {
	const { id } = useParams();
	const [movie, setMovie] = useState(initialMovie);
	const history = useHistory();
	const { push } = history;

	// Fetch selected movie data on component load
	useEffect(() => {
		axios.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.message))
	}, []);

	// Handle form changes to state
	const changeHandler = (e) => {
		setMovie({ ...movie, [e.target.name]: e.target.value})
	};

	// Submit changed movie data to API
	const submitHandler = (e) => {
		e.preventDefault();
		const starsArr = movie.stars.split(',');
		axios.put(`http://localhost:5000/api/movies/${id}`, {...movie, stars: starsArr})
			.then((res) => {
				console.log(res);
				props.getMovieList();
				push(`/movies/${id}`);
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<>
			{!movie.title ? <div>Loading...</div>
			: <div>
					<Form onSubmit={submitHandler} className="updateForm">
						<FormGroup className="formItem">
							<Label for="title">Title</Label>
							<Input name="title" value={movie.title} onChange={changeHandler} />
						</FormGroup>

						<FormGroup className="formItem">
							<Label for="director">Director</Label>
							<Input name="director" value={movie.director} onChange={changeHandler} />
						</FormGroup>

						<FormGroup className="formItem">
							<Label for="metascore">Metascore</Label>
							<Input name="metascore" value={movie.metascore} onChange={changeHandler} />
						</FormGroup>

						<FormGroup className="formItem">
							<Label for="stars">Stars</Label>
							<Input name="stars" value={movie.stars} onChange={changeHandler} />
						</FormGroup>

						<Button>Save</Button>
					</Form>
				</div>
			}
		</>
	)
};

export default UpdateMovie;