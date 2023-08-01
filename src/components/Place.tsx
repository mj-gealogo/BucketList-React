import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Image from "./Image";
import ImageBanner from "./ImageBanner";

const Place = () => {
    const { cid } = useParams();
    const { pid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [place, setPlace] = React.useState<Place>();
    const [activities, setActivities] = React.useState<Array<Activity>>([]);


    useEffect(() => {
        getPlace();
        getPlaceActivities();
    }, []);

    const getPlace = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places/' + pid)
            .then((response) => {
                setErrorFlag(false);
                setPlace(response.data);
            }, (error) => {
                setErrorFlag(true);
                if (error.response.status === 500) {
                    setErrorMessage("Server currently down: Please come back later");
                } else {
                    setErrorMessage(error.toString());
                }
            });
    };

    const getPlaceActivities = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places/' + pid + '/activities')
            .then((response) => {
                setErrorFlag(false);
                setActivities(response.data);
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
            <div className="position-relative">
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <h1 className="text-light text-shadow p-3 display-3">{place?.name}</h1>
                </div>
                <ImageBanner id={cid ? parseInt(cid, 10) : -1} type={'country'}></ImageBanner>
            </div>

            <div className="container mt-4">
                <div className="row text-center p-3 px-md-5 d-flex align-items-center justify-content-center">
                    <h2>About:</h2>
                    <p className="">{place?.description}</p>
                </div>

                <hr/>
                <h2>Activities</h2>

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
                    {activities.map((activity: Activity, index) => (
                        <div key={activity.id} className={`col-md-6 ${index % 2 === 0 ? "order-md-1" : "order-md-2"}`}>
                            <div className="card">
                                <div className="card-body">
                                    <Image id={activity.id} type={'activity'} />
                                    <h4 className="card-title">{activity.name}</h4>
                                    <div className="card-text">{activity.description}</div>
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
