import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from './axios';
import requests from './Requests';
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

function Banner() {
    const [movie, setMovie] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentTrailer, setCurrentTrailer] = useState('');
    const currentPlan = useSelector(selectUserPlan)?.plan;

    const classes = useStyles();

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
                    <button className="banner__button"
                        onClick={() => {
                            if(currentPlan === "Basic") alert("Upgrade your plan to Standard or Premium to watch movie trailers");
                            else {
                                movieTrailer(null,{tmdbId: movie?.id}).then(res => {
                                    setCurrentTrailer(res);
                                    if(res) setOpen(true);
                                    else alert('There is no available trailer for this movie!');
                                })
                            }                          
                        }}
                    >Play</button>
                    <button className="banner__button">My list</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview,150)}</h1>
                
            </div>
            <div className="banner--fadebottom"></div>
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
        </header>
    )
}

export default Banner
