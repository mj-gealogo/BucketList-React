import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import Header from "./Header";
import Image from "./Image";

const Country = () => {
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [countries, setCountries] = React.useState<Array<Country>>([]);

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

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    {countries.map((country: Country, index) => (
                        <div key={country.cid} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h4 className="card-title">{country.name}</h4>
                                    <Image id={country.cid} type={'country'} />
                                    <div className="card-text">{country.description}</div>
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
