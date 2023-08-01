import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import Header from "./Header";
import Image from "./Image";
import { Link, useLocation } from "react-router-dom";

const Countries = () => {
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [countries, setCountries] = React.useState<Array<Country>>([]);
    const location = useLocation();

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = () => {
        axios.get(BASE_URL + '/countries')
            .then((response) => {
                setErrorFlag(false);
                setCountries(response.data);
            }, (error) => {
                setErrorFlag(true);
                if (error.response.status === 500) {
                    setErrorMessage("Server currently down: Please come back later");
                } else {
                    setErrorMessage(error.toString());
                }
            });
    };

    // Function to truncate the description to a maximum of 100 characters
    const truncateDescription = (description: string) => {
        if (description.length > 100) {
            return description.substring(0, 300) + "...";
        }
        return description;
    };

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h1>All Countries</h1>
                <hr/>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-button" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" id="search-button">Search</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                                </li>
                                <li className="page-item active" aria-current="page">
                                    <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    {countries.map((country: Country, index) => (
                        <div key={country.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <Image id={country.id} type={'country'} />
                                <div className="card-body">
                                    <h4 className="card-title">{country.name}</h4>
                                    <div className="card-text">{truncateDescription(country.description)}</div>
                                    <Link to={location.pathname + '/' + country.id} className="btn btn-outline-primary mt-3">View Country</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Countries;
