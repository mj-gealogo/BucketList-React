import React from 'react';
import Header from "./Header";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Michael's Bucket List</h1>
                    <p className="lead">Start your adventure and create your own bucket list!</p>
                    <hr className="my-4" />
                    <p>Here are some popular destinations and activities:</p>
                    <ul>
                        <li>Travel to the Grand Canyon</li>
                        <li>Visit Machu Picchu</li>
                        <li>Learn to surf in Hawaii</li>
                        <li>Go skydiving in Dubai</li>
                    </ul>
                    <a className="btn btn-primary btn-lg" href="#explore" role="button">Explore</a>
                </div>
            </div>
        </div>
    );
};

export default Home;
