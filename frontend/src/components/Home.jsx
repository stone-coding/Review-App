import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";
import { useNavigate } from "react-router";
import NotVerified from "./User/NotVerified";

export default function Home() {
 return <NotVerified/>
}
