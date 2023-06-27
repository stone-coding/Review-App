import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "../admin/Dashboard";
import Movies from "../admin/Movies";
import Actors from "../admin/Actors";
import NotFound from "../NotFound";
import Narbar from "../admin/Narbar";

export default function AdminNavigator() {
  return (
    <div className="flex">
      <Narbar />
      <div className="flex-1 p-2 max-w-screen-xl">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>

    </div>
  );
}
