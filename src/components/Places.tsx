import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import Header from "./Header";
import Image from "./Image";
import {Link} from "react-router-dom";

const Places = () => {
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [country, setCountry] = React.useState<Country>();
    const [places, setPlaces] = React.useState<Array<Place>>([]);

    useEffect(() => {
        getPlaces();
    }, []);

    const getPlaces = () => {
        axios.get(BASE_URL + '/places')
            .then((response) => {
                setErrorFlag(false);
                setPlaces(response.data);
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
                <h1>All Places</h1>
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
                    <h1>{country?.name}</h1>
                </div>
                <div className="row">
                    {places.map((place: Place, index) => (
                        <div key={place.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <Image id={place.id} type={'place'} />
                                <div className="card-body">
                                    <h4 className="card-title">{place.name}</h4>
                                    <div className="card-text">{truncateDescription(place.description)}</div>
                                    <Link to={"/places/" + place.id} className="btn btn-outline-primary mt-3">View Place</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Places;
