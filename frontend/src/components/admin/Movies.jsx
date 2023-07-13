import React, { useEffect, useState } from "react";
import MovieListItem from "../MovieListItem";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";

const limit = 1;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo) => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);

    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setMovies([...movies]);
  };

  // function render some movies first time
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => {
        return <MovieListItem key={movie.id} movie={movie} />;
      })}

      <NextAndPrevButton
        className="mt-5"
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
      />
    </div>
  );
}
