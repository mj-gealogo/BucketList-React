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
                <div className="row">
                    {countries.map((country: Country, index) => (
                        <div key={country.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h4 className="card-title">{country.name}</h4>
                                    <Image id={country.id} type={'country'} />
                                    <div className="card-text">{truncateDescription(country.description)}</div>
                                    <Link to={location.pathname + '/' + country.id} className="btn btn-outline-primary">View Country</Link>
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
