import React, { useState, useEffect, useRef } from 'react';
import yts from '../../api';
import { Link } from 'react-router-dom';

//assets
import ImdbIcon from '../../assets/imdb.svg';
import LikeIcon from '../../assets/like.svg';
import DownloadIcon from '../../assets/download.svg';
import logo from '../../assets/LORE.svg';

const loreScroll = (ref) => {
    window.scrollTo({
        top: 0,
        left: ref.current.offsetTop,
        behavior: 'smooth',
    });
};

const MoviesDeatils = ({ match }) => {
    const scrollRef = useRef(null);
    const movie_id = match.params.id;
    const [movieDetail, setMovieDetail] = useState([]);
    const [genres, setGenres] = useState([]);
    const [torrents, setTorrents] = useState([]);
    const [similarMovie, setSimilarMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const fetchMovieDetails = await yts.get(
                `api/v2/movie_details.json/`,
                {
                    params: {
                        movie_id,
                    },
                }
            );

            const fetchSimilarMovies = await yts.get(
                `api/v2/movie_suggestions.json/`,
                {
                    params: {
                        movie_id,
                    },
                }
            );

            setMovieDetail(fetchMovieDetails.data.data.movie);
            setGenres(fetchMovieDetails.data.data.movie.genres);
            setTorrents(fetchMovieDetails.data.data.movie.torrents);
            setSimilarMovies(fetchSimilarMovies.data.data.movies);
            setIsLoading(false);
        })();
    }, [movie_id]);

    const circularLoading = isLoading && (
        <div className='loading-bg d-flex justify-content-center align-items-center'>
            <div className='spinner-grow text-light' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    );

    //style
    const Style = {
        containerBg: {
            backgroundImage: `linear-gradient(to bottom,rgba(29,29,29,0.65) 0,rgba(29,29,29,.8) 100%), url(${movieDetail.background_image_original})`,
        },
    };

    const loadDefaultPoster = (e) => {
        const elem = e.target;
        elem.src = logo;
        elem.classList.add('default-poster');
    };

    return (
        <>
            {circularLoading}
            <div
                ref={scrollRef}
                className='movie-details-container'
                style={Style.containerBg}
            >
                <div style={{ padding: '0 5vw 50px 0' }}>
                    <div className='movie-main-details'>
                        <div className='movie-poster-left'>
                            <div className='main-movie-poster'>
                                <img
                                    onError={loadDefaultPoster}
                                    src={movieDetail.medium_cover_image}
                                    alt={movieDetail.slug}
                                />
                            </div>
                        </div>
                        <div className='movie-details-middle'>
                            <div className='movie-details-title'>
                                <h1>{movieDetail.title}</h1>
                                <div>
                                    {genres.map((genre, i) => {
                                        if (i !== genres.length - 1) {
                                            return <i key={i}>{genre} | </i>;
                                        }
                                        return <i key={i}>{genre} </i>;
                                    })}{' '}
                                </div>
                                <div>
                                    {movieDetail.year} | {movieDetail.language}
                                </div>
                            </div>
                            <span className='break-line'></span>
                            <div className='movie-genres'>
                                {torrents.size === 1 ? (
                                    <div>Download:</div>
                                ) : (
                                    <div>Downloads:</div>
                                )}
                                {/* map through the torrents available */}
                                {torrents.map((torrent, i) => {
                                    return (
                                        <div key={i} className='torrents'>
                                            <a
                                                href={`${torrent.url}`}
                                                style={{ color: 'red' }}
                                            >
                                                {torrent.quality}
                                            </a>
                                            , {torrent.size}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='ratings'>
                                <div className='imdb-count ratings-counts'>
                                    <img
                                        src={ImdbIcon}
                                        className='imdb-icon'
                                        alt='imdb logo'
                                    />
                                    <span>{movieDetail.rating}</span>
                                </div>

                                <div className='like-count ratings-counts'>
                                    <img
                                        src={LikeIcon}
                                        className='rating-icon like-icon'
                                        alt='heart icon'
                                    />
                                    <span>{movieDetail.like_count}</span>
                                </div>

                                <div className='like-count ratings-counts'>
                                    <img
                                        src={DownloadIcon}
                                        className='rating-icon download-icon'
                                        alt='download icon'
                                    />
                                    <span>{movieDetail.download_count}</span>
                                </div>
                            </div>
                        </div>
                        <div className='movie-specs'>
                            <div className='tech-specs'>
                                <div className='tech-specs-left-content'>
                                    <h2 className='dis-title'>Description </h2>
                                    <p>{movieDetail.description_full}</p>
                                    <div className='upload-date'>
                                        Uploaded at: {movieDetail.date_uploaded}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='movie-trailer-video'>
                        <div className='movie-trailer-grid'>
                            <div>
                                <h2>Trailer</h2>
                                <div className='trailer'>
                                    <iframe
                                        title='selected movie trailer frame'
                                        className='trailer-iframe'
                                        height='350px'
                                        src={`https://www.youtube.com/embed/${movieDetail.yt_trailer_code}`}
                                        frameBorder='0'
                                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div className='similar-movies'>
                                <div className='similar-movies-right-contents'>
                                    <h2>Similar movies</h2>
                                    <div className='similar-movies-right'>
                                        {similarMovie.map((movie, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className='similar-movie'
                                                >
                                                    <Link
                                                        to={`/movie-details/${movie.id}`}
                                                        onClick={() =>
                                                            loreScroll(
                                                                scrollRef
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                movie.medium_cover_image
                                                            }
                                                            alt='movie thumbnail'
                                                        />
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoviesDeatils;
