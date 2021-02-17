import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map((movie) => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div>
        <Link to="/add-movie">
          <Button>Add Movie</Button>
        </Link>
        <Link to="/">
          <Button color="primary">Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default SavedList;
