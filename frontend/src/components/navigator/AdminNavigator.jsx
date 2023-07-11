import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "../admin/Dashboard";
import Movies from "../admin/Movies";
import Actors from "../admin/Actors";
import NotFound from "../NotFound";
import Narbar from "../admin/Narbar";
import Header from "../admin/Header";
import MovieUpload from "../admin/MovieUpload";

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false)

  const displatMovieUploadModal = () =>{
    setShowMovieUploadModal(true)
  }

  const hideMovieUploadModal = () =>{
    setShowMovieUploadModal(false)
  }

  
  return (
    <>
     <div className="flex dark:bg-primary bg-white">
      <Narbar />
      <div className="flex-1 p-2 max-w-screen-xl">
        <Header onAddMovieClick={displatMovieUploadModal} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal}/>
    </>
   
  );
}
