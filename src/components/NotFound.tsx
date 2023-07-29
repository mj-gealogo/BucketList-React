import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <Header />
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="text-center">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary">Go to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
