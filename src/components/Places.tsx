import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import {Link, useLocation, useParams} from "react-router-dom";
import Header from "./Header";
import Image from "./Image";

const Places = () => {
    const { cid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [places, setPlaces] = React.useState<Array<Place>>([]);
    const location = useLocation();

    useEffect(() => {
        getPlaces();
    }, []);

    const getPlaces = () => {
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

    // Function to truncate the description to a maximum of 100 characters
    const truncateDescription = (description: string) => {
        if (description.length > 100) {
            return description.substring(0, 300) + "...";
        }
        return description;
    };

    return (
        <div>
            <Header></Header>
            <div className="container mt-4">
                <div className="row">
                    {places.map((place: Place, index) => (
                        <div key={place.id} className={`col-md-6 ${index % 2 === 0 ? "order-md-1" : "order-md-2"}`}>
                            <div className="card">
                                <div className="card-body">
                                    <Image id={place.id} type={'activity'} />
                                    <h4 className="card-title">{place.name}</h4>
                                    <div className="card-text">{truncateDescription(place.description)}</div>
                                    <div className="card-text">{place.country}</div>
                                    <Link to={location.pathname + '/' + place.id} className="btn btn-outline-primary">View Place</Link>
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
