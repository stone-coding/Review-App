import React, { useEffect, useState } from "react";
import MovieListItem from "../MovieListItem";
import { deleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import { useMovies, useNotification } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateMovie from "../modals/UpdateMovie";
import ConfirmModal from "../modals/ConfirmModal";

const limit = 1;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const {
    fetchMovies,
    fetchPrevPage,
    fetchNextPage,
    movies: newMovies,
  } = useMovies();

  // const fetchMovies = async (pageNo) => {
  //   const { error, movies } = await getMovies(pageNo, limit);
  //   if (error) updateNotification("error", error);

  //   if (!movies.length) {
  //     currentPageNo = pageNo - 1;
  //     return setReachedToEnd(true);
  //   }
  //   setMovies([...movies]);
  // };

  // const handleOnNextClick = () => {
  //   if (reachedToEnd) return;
  //   currentPageNo += 1;
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnPrevClick = () => {
  //   if (currentPageNo <= 0) return;
  //   if (reachedToEnd) setReachedToEnd(false);
  //   currentPageNo -= 1;
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await getMovieForUpdate(id);
  //   if (error) return updateNotification("error", error);
  //   setSelectedMovie(movie);
  //   setShowUpdateModal(true);
  // };

  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(false);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(true);

  //   if (error) updateNotification("error", error);

  //   updateNotification("success", message);
  //   hideConfirmModal();
  //   fetchMovies(currentPageNo);
  // };

    // const hideConfirmModal = () => {
  //   setShowConfirmModal(false);
  // };

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) {
  //       return movie;
  //     }
  //     return m;
  //   });
  //   setMovies([...updatedMovies]);
  // };

  // const hideUpdateForm = () => {
  //   setShowUpdateModal(false);
  // };

  // const handleAfterDelete = () => {
  //   fetchMovies()
  // };

  const handleUIUpdate = () => {
    fetchMovies()
  };

  // function render some movies first time
  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {newMovies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
              // onEditClick={() => handleOnEditClick(movie)}
              // onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}

        <NextAndPrevButton
          className="mt-5"
          onNextClick={fetchNextPage}
          onPrevClick={fetchPrevPage}
        />
      </div>

      {/* <UpdateMovie
        visible={showUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}
      /> */}

      {/* <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subtitle="This action will remove this movie permanently!"
        busy={busy}
      /> */}
    </>
  );
}
