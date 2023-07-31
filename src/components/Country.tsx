import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import Header from "./Header";
import Image from "./Image";
import { useParams} from "react-router-dom";
import ImageBanner from "./ImageBanner";

const Country = () => {
    const { cid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [country, setCountry] = React.useState<Country>({description: "", id: 0, name: ""});
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
            <div className="position-relative">
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <h1 className="text-light">{country.name}</h1>
                </div>
                <ImageBanner id={cid ? parseInt(cid, 10) : -1} type={'country'}></ImageBanner>
            </div>

            <div className="row text-center p-2">
                <h2>About:</h2>
                <p className="">{country.description}</p>
            </div>
            <div className="container mt-4">
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
