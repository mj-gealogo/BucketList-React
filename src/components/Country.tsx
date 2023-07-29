import React, {useEffect, useState} from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";

const Country = () => {
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [countries, setCountries] = React.useState < Array < Country >> ([])

    useEffect(() => {
        getCountries()
    }, []);

    const getCountries = () => {
        axios.get(BASE_URL + '/countries')
            .then((response) => {
                setErrorFlag(false)
                setCountries(response.data)
            }, (error) => {
                setErrorFlag(true)
                if (error.response.status === 500) {
                    setErrorMessage("Server currently down: Please come back later")
                } else {
                    setErrorMessage(error.toString())
                }
            })
    }

    return (
        <div>
            {countries.map((country: Country) => (
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{country.name}</div>
                        <div className="card-text">{country.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Country;
