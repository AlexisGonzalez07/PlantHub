import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/index.js";
import Footer from "./components/Footer";
import About from "./pages/About";
import MyGarden from "./pages/MyGarden/index";
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import PlantFacts from "./pages/PlantFacts";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-container">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/testimonials">
          <Testimonials />
        </Route>
        <Route exact path="/mygarden">
          <MyGarden />
        </Route>
        <Route exact path="/PlantFacts">
          <PlantFacts />
        </Route>
        <Route exact path="/forum">
          <Forum />
        </Route>
        <Route exact path="/team">
          <Team />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
