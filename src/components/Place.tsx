import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Image from "./Image";

const Place = () => {
    const { cid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [places, setPlaces] = React.useState<Array<Place>>([]);

    useEffect(() => {
        getActivities();
    }, []);

    const getActivities = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places/')
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
            <Header></Header>
            <div className="container mt-4">
                <div className="row">
                    {places.map((place: Place, index) => (
                        <div key={place.pid} className={`col-md-6 ${index % 2 === 0 ? "order-md-1" : "order-md-2"}`}>
                            <div className="card">
                                <div className="card-body">
                                    <Image id={place.pid} type={'activity'} />
                                    <h4 className="card-title">{place.name}</h4>
                                    <div className="card-text">{place.description}</div>
                                    <div className="card-text">{place.country}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Place;
