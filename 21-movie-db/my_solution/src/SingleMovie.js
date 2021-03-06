import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT, defaultImage } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });

  const fetchOneMovie = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status} `);
      }

      const data = await response.json();
      if (data.Response === "True") {
        setMovie(data);
        setError({ show: false, message: "" });
      } else {
        setError({ show: true, message: data.Error });
      }
    } catch (error) {
      console.log(error);
      setError({ show: true, message: error });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOneMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.message}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  return (
    <section className="single-movie">
      <img
        src={movie.Poster === "N/A" ? defaultImage : movie.Poster}
        alt={movie.Title}
      />
      <div className="single-movie-info">
        <h2>{movie.Title}</h2>
        <p>
          <b>Summary :</b> {movie.Plot}
        </p>
        <p>
          <b>Release :</b> {movie.Released}
        </p>
        <p>
          <b>Genre :</b> {movie.Genre}
        </p>
        <p>
          <b>Duration :</b> {movie.Runtime}
        </p>
        <p>
          <b>Director :</b> {movie.Director}
        </p>
        <p>
          <b>Writer :</b> {movie.Writer}
        </p>
        <p>
          <b>Actors : </b> {movie.Actors}
        </p>
        <p>
          <b>Language : </b> {movie.Language}
        </p>
      </div>
    </section>
  );
};

export default SingleMovie;
