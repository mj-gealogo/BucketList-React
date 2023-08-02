import React, { useEffect, useState } from 'react';
import axios from "axios";
import BASE_URL from "./BaseUrl";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ImageBanner from "./ImageBanner";


const Activity = () => {
    const { cid } = useParams();
    const { pid } = useParams();
    const { aid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [activity, setActivity] = React.useState<Activity>();


    useEffect(() => {
        getActivity();
    }, []);

    const getActivity = () => {
        axios.get(BASE_URL + '/countries/' + cid + '/places/' + pid + '/activities/' + aid)
            .then((response) => {
                setErrorFlag(false);
                setActivity(response.data);
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
                    <h1 className="text-light text-shadow p-3 display-3">{activity?.name}</h1>
                </div>
                <ImageBanner id={aid ? parseInt(aid, 10) : -1} type={'activity'}></ImageBanner>
            </div>

            <div className="container mt-4">
                <div className="row text-center p-3 px-md-5 d-flex align-items-center justify-content-center">
                    <h2>About:</h2>
                    <p className="">{activity?.description}</p>
                </div>

                <hr/>
            </div>
        </div>
    );
};

export default Activity;
