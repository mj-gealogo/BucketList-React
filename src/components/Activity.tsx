import React, {useEffect, useState} from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import {useParams} from "react-router-dom";

const Activity = () => {
    const {pid} = useParams();
    const {cid} = useParams();
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [activities, setActivities] = React.useState < Array < Activity >> ([])

    useEffect(() => {
        getActivities()
    }, []);

    const getActivities = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places/' + pid + '/activities/')
            .then((response) => {
                setErrorFlag(false)
                setActivities(response.data)
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
            {activities.map((activity: Activity) => (
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{activity.name}</div>
                        <div className="card-text">{activity.description}</div>
                        <div className="card-text">{activity.country } {activity.place}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Activity;
