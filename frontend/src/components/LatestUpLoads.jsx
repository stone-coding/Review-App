import React from "react";
import MovieListItem from "./MovieListItem";


export default function LatestUpLoads() {
  return (
    <div className="bg-white shadow dak:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItem
        movie={{
          poster:
            "https://images.unsplash.com/photo-1682686581580-d99b0230064e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          title: "Lorem ipsum dolor sit amet",
          status:'public',
          genres:['Action','Comedy'],
        }}
      />
    </div>
  );
}


