import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory} from "react-router-dom";

import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`)
    
  }



  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then( res => {
        history.push(`/`)
      })
      .catch()
  }


  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
      <div className="delete" onClick={deleteMovie}>
        Delete
      </div>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
