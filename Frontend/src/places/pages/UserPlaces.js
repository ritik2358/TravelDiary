import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

// const DUMMY_PLACES = [{
//     id: 'r1',
//     title: 'Maa Bhagwati Bhawan',
//     description: 'Housing Complex',
//     imageUrl: 'https://source.unsplash.com/C6oPXOatFD8',
//     address: 'XXFF+445, Belaganj, Bihar 804403',
//     location: {
//         lat: 24.9727717,
//         lng: 84.9706764
//     },
//     creator: 'rits'
// },
// {

//     id: 'r2',
//     title: 'Harsha Nilaya',
//     description: 'Housing Complex',
//     imageUrl: '',
//     address: '3128, Harsha Nilaya, 4th Main, 3rd Cross Rd, 1st Stage, Kumaraswamy Layout, Bengaluru, Karnataka',
//     location: {
//         lat: 12.9100171,
//         lng: 77.5612242
//     },
//     creator: 'raj'

// }]

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (err) { }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = deletedPlaceId => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}
            />}
        </React.Fragment>
    );
};

export default UserPlaces;
