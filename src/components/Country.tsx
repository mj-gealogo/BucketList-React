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
            <div className="position-relative">
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <h1 className="text-light text-shadow display-3">{country.name}</h1>
                </div>
                <ImageBanner id={cid ? parseInt(cid, 10) : -1} type={'country'}></ImageBanner>
            </div>


            <div className="container mt-4">
                <div className="row text-center p-3 px-md-5 d-flex align-items-center justify-content-center">
                    <h2>About:</h2>
                    <p className="">{country.description}</p>
                </div>

                <hr/>
                <h2>Places</h2>

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
                    {places.map((place: Place, index) => (
                        <div key={place.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <Image id={place.id} type={'place'} />
                                <div className="card-body">
                                    <h4 className="card-title">{place.name}</h4>
                                    <div className="card-text mt-3">{truncateDescription(place.description)}</div>
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
