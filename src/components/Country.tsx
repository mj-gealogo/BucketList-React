import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import Header from "./Header";
import Image from "./Image";
import {Link, useLocation, useParams} from "react-router-dom";

const Country = () => {
    const { cid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [country, setCountry] = React.useState<Country>();
    const [places, setPlaces] = React.useState<Array<Place>>([]);

    useEffect(() => {
        getCountry();
        getCountryPlaces();
    }, []);

    const getCountry = () => {
        axios.get(BASE_URL + '/countries/' + cid)
            .then((response) => {
                setErrorFlag(false);
                setCountry(response.data);
            }, (error) => {
                setErrorFlag(true);
                if (error.response.status === 500) {
                    setErrorMessage("Server currently down: Please come back later");
                } else {
                    setErrorMessage(error.toString());
                }
            });
    };

    const getCountryPlaces = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places')
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

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <h1>{country?.name}</h1>
                </div>
                <div className="row">
                    {places.map((place: Place, index) => (
                        <div key={place.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h4 className="card-title">{place.name}</h4>
                                    <Image id={place.id} type={'place'} />
                                    <div className="card-text">{place.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Country;
