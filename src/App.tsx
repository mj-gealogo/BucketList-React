import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Countries from "./components/Countries";
import Activities from "./components/Activities";
import Places from "./components/Places";
import Country from "./components/Country";
import Place from "./components/Place";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/" element={<Home/>}/>
                <Route path="/countries" element={<Countries/>}/>
                <Route path="/countries/:cid/places/" element={<Places/>}/>
                <Route path="/countries/:cid/places/:pid/activities" element={<Activities/>}/>
                <Route path="/countries/:cid" element={<Country/>}/>
                <Route path="/countries/:cid/places/:pid" element={<Place/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;