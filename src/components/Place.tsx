import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Image from "./Image";

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
            <div className="container mt-4">
                <div className="row">
                    <h4>{place?.name}</h4>
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
