import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';

const FEATURED_API =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e3225379d10535ab222db77bee2fbdc6&page=1';

const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?api_key=e3225379d10535ab222db77bee2fbdc6&query=';

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	const getMovies = (API) => {
		fetch(API)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
			});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (searchTerm) {
			getMovies(SEARCH_API + searchTerm);

			setSearchTerm('');
		}
	};

	const handleOnChange = (e) => {
		setSearchTerm(e.target.value);
	};

	function refreshPage() {
		window.location.reload(true);
	}

	return (
		<>
			<header>
				<div>
					<button className="button" onClick={refreshPage}>
						Home of movies 🎥
					</button>
				</div>
				<form onSubmit={handleOnSubmit}>
					<input
						type="text"
						className="search"
						placeholder="Search here..."
						value={searchTerm}
						onChange={handleOnChange}
					/>
				</form>
			</header>
			<div className="movie-container">
				{movies.length > 0 &&
					movies.map((movie) => (
						<Movie key={movie.id} {...movie} />
					))}
			</div>
		</>
	);
}

export default App;
