import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";
import { useNavigate } from "react-router";
import NotVerified from "./User/NotVerified";
import TopRatedMovies from "./User/TopRatedMovies";
import TopRatedWebSeries from "./User/TopRatedWebSeries";
import TopRatedTVSeries from "./User/TopRatedTVSeries";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container>
        <NotVerified />
        {/* slider */}
        {/* Most rated movies */}
        <TopRatedMovies />
        <TopRatedWebSeries />
        <TopRatedTVSeries />
      </Container>
    </div>
  );
}
