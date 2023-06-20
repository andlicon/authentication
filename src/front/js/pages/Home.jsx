import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center pt-5">
      <h1>Authentication system with Python Flask and React.js</h1>
      <p>Almost every website in the world has user authentication, in this project you have to implement user authentication using the Python Flask framework for building a backend REST API and React.js and sessionStorage API for the front end web application.</p>
    </div>
  );
};
