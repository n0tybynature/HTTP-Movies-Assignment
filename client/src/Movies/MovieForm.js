import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const initialForm = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

export default function MovieForm(props){

    const [movies,setMovies] = useState(initialForm)
    const {setMovieList} = props

    const { push } = useHistory();


    const handleChange = e => {
        e.persist();
        setMovies({
            ...movies,
            [e.target.name]:e.target.value
        });

    }  

    const handleSubmit = (e) => {
        const newMovie = {
            ...movies,
            stars: movies.stars.split(', ')
        }
        e.preventDefault();

        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then( res => {
                setMovieList(res.data);
                push(`/`)
            })
            .catch( err => {
                console.log(err)
            });
    }

    return (
        <div>
            <h2>Add Move Here</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={movies.title} placeholder="Title" onChange={handleChange} name='title'/>
                <input type="text" value={movies.director} placeholder="Director" onChange={handleChange} name='director'/>
                <input type="text" value={movies.metascore} placeholder="Metascore" onChange={handleChange} name='metascore'/>
                <input type="text" value={movies.stars} placeholder="Stars" onChange={handleChange} name="stars"/>
                <button>Submit Movie</button>
            </form>
        </div>
    )


}