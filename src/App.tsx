import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Countries from "./components/Countries";
import CountryPlaces from "./components/CountryPlaces";
import Country from "./components/Country";
import Place from "./components/Place";
import Places from "./components/Places";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/" element={<Home/>}/>
                <Route path="/countries" element={<Countries/>}/>
                <Route path="/countries/:cid/places/" element={<CountryPlaces/>}/>
                <Route path="/countries/:cid" element={<Country/>}/>
                <Route path="/countries/:cid/places/:pid" element={<Place/>}/>
                <Route path="/places" element={<Places/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;