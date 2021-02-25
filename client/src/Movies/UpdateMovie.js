import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
   
    title:"",
    director:"",
    metascore:"",
    
}





export default function UpdateMovie(props){

    const [movie, makeMovie] = useState(initialMovie)
    const { movieList, setMovieList } = props
    const { id } = useParams();
    const history = useHistory();

    useEffect(() =>{
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then( res => {
                console.log(res)
                makeMovie(res.data)
            })
            .catch( err => {
                console.log(err)
            })
    },[]);



    const changeInfo = e => {
        e.persist();

        makeMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const submitInfo = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then( res => {
                setMovieList([...movieList, res.data])
                history.push(`/`)
            })
            .catch( err => {
                console.log(err);
            });
    };


    return (
        <div>
            <form className="update-form" onSubmit={submitInfo}>
                <input type="text" name="title" value={movie.title} onChange={changeInfo}/>
                <input type="text" name="director" value={movie.director} onChange={changeInfo}/>
                <input type="text" name="metascore" value={movie.metascore} onChange={changeInfo}/>
                <button>Submit</button>
            </form>
        </div>


    )


}