import React, {useEffect, useState} from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import {useParams} from "react-router-dom";

const Place = () => {
    const {cid} = useParams();
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [places, setPlaces] = React.useState < Array < Place >> ([])

    useEffect(() => {
        getActivities()
    }, []);

    const getActivities = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places/')
            .then((response) => {
                setErrorFlag(false)
                setPlaces(response.data)
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
            {places.map((place: Place) => (
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{place.name}</div>
                        <div className="card-text">{place.description}</div>
                        <div className="card-text">{place.country }</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Place;
