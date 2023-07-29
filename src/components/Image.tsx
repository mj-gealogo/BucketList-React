import React, {useEffect, useState} from 'react';
import BASE_URL from "./BaseUrl";
import PropTypes from "prop-types";


const Image = (props: any) => {
    const { id } = props;
    const { type } = props;
    const [imageUrl, setImageUrl] = useState("");
    const defaultImageUrl = 'https://images.pexels.com/photos/230514/pexels-photo-230514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    useEffect(() => {
        switch (type) {
            case "country":
                setImageUrl(BASE_URL + "/countries/" + id + "/image");
                break;
            case "place":
                setImageUrl(BASE_URL + "/places/" + id + "/image");
                break;
            case "activity":
                setImageUrl(BASE_URL + "/activities/" + id + "/image");
                break;
        }
    }, [])

    const handleImageError = () => {
        setImageUrl(defaultImageUrl);
    }

    return (
        <img
            src={imageUrl}
            onError={handleImageError}
            className="img-fluid w-100"
            style={{ aspectRatio: '1/1',
                objectFit: 'cover',
                objectPosition: 'center'}}
            alt="Film Image"
        />
    );
};

Image.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['country', 'place', 'activity']).isRequired,
};
export default Image;
