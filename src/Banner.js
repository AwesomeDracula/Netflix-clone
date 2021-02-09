import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from './axios';
import requests from './Requests';

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * (request.data.results.length - 1))
            ]);
        }
        fetchData();
    }, []);

    const truncate = (string, num) => {
        return string?.length > num ? string.substr(0,num-1) + '...' : string;
    }

    return (
        <header className="banner" style={
            {
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
            }
        }>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My list</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview,150)}</h1>
                
            </div>
            <div className="banner--fadebottom"></div>
        </header>
    )
}

export default Banner
