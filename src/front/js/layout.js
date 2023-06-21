import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from './store/appContext';

import { Home } from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Private from "./pages/Private.jsx";
import Denied from "./pages/Denied.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import Alert from './component/Alert.jsx'

//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "";
  const { store: { alert } } = useContext(Context);

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<SignIn />} path="/signin" />
            <Route element={<Denied />} path="/denied" />
            <Route element={<Private />} path="/private" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          {
            alert && <Alert />
          }
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
