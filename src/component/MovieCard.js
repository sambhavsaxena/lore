import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//assets
import imdb from '../assets/imdb.svg';
import logo from '../assets/LORE.svg';

const loadDefaultPoster = (e) => {
    const elem = e.target;
    elem.src = logo;
    elem.classList.add('default-poster');
};

const MovieCard = ({ movie }) => (
    <div className='col-sm movies'>
        <Link className='movies-link' to={`/movie-details/${movie.id}`}>
            <div className='movie-poster'>
                <img
                    onError={loadDefaultPoster}
                    src={movie.medium_cover_image}
                    alt={movie.title}
                />
            </div>
            <div className='movie-details'>
                <h3 className='g'>{movie.genres && movie.genres[0]}</h3>
                <h3 className='g'>{movie.genres && movie.genres[1]}</h3>
                <h3 className='g'>{movie.genres && movie.genres[2]}</h3>
                <h3 className='g'>{movie.genres && movie.genres[3]}</h3>
                <div className='movie-details-btn'>
                    {/* <Link
                        style={{ color: '#fff' }}
                        to={`/movie-details/${movie.id}`}
                    >
                        Movie Details
                    </Link> */}

                    {/* solved: validateDOMNesting(...): <a> cannot appear as a descendant of <a>. */}
                    <button
                        style={{
                            color: '#fff',
                            padding: '0',
                            background: 'none',
                            border: 'none',
                        }}
                        onClick={() => (
                            <Redirect to={`/movie-details/${movie.id}`} />
                        )}
                    >
                        Details
                    </button>
                </div>
            </div>
            {movie.title && movie.title.length > 20
                ? `${movie.title.substring(0, 30)}...`
                : `${movie.title}`}
            <br />
            {movie.year}
            <p className='movie-rating'>
                <img className='imdb-logo' src={imdb} alt='movie ratings' />{' '}
                {movie.rating === 0 ? 'N/A' : movie.rating}
            </p>
            <br />
            <br />
        </Link>
    </div>
);

export default MovieCard;
