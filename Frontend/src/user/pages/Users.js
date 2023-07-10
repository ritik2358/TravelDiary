import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
import { useHttpClient } from './../../shared/hooks/http-hook';

const Users = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();


    useEffect(() => {
        const fetchUsers = async () => {
            // setIsLoading(true);
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');

                // const responseData = await response.json();

                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }

                setLoadedUsers(responseData.users);
                // setIsLoading(false);
            } catch (err) {
                // setIsLoading(false);
                // setError(err.message);
            }
            // setIsLoading(false);
        }
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    )

    // const errorHandler = () => {
    //     setError(null);
    // }
    // const USERS = [
    //     { id: 'rits', name: 'Ritik', image: 'https://source.unsplash.com/C6oPXOatFD8', places: 3 }
    // ]

}

export default Users