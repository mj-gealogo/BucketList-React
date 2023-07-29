import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Country from "./components/Country";
import Activity from "./components/Activity";
import Place from "./components/Place";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/" element={<Home/>}/>
                <Route path="/countries" element={<Country/>}/>
                <Route path="/countries/:cid/places/" element={<Place/>}/>
                <Route path="/countries/:cid/places/:pid/activities" element={<Activity/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;