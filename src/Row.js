import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from './axios';
import movieTrailer from 'movie-trailer';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { selectUserPlan } from './features/userSlice';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: "black",
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: '50px 50px 50px'
    },
}));

function Row({title , fetchUrl, isLargeRow = false}) {
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentTrailer, setCurrentTrailer] = useState('');
    const currentPlan = useSelector(selectUserPlan)?.plan;

    const classes = useStyles();

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    ((isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)) &&
                    (
                        <img onClick={() => {
                            if(currentPlan === "Basic") alert("Upgrade your plan to Standard or Premium to watch movie trailers");
                            else {
                                movieTrailer(null,{tmdbId: movie?.id}).then(res => {
                                    setCurrentTrailer(res);
                                    if(res) setOpen(true);
                                    else alert('There is no available trailer for this movie!');
                                })
                            }                          
                        }}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} 
                        alt={movie?.name}/>
                    )
                ))}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    {currentTrailer && <ReactPlayer url={currentTrailer} controls/>}
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Row
