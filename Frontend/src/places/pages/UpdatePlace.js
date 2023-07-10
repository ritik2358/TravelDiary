import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from '../../shared/hooks/form-hook'

import './UpdatePlace.css'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIelements/Card'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import { AuthContext } from '../../shared/context/auth-context'

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
//     imageUrl: 'https://source.unsplash.com/C6oPXOatFD8',
//     address: '3128, Harsha Nilaya, 4th Main, 3rd Cross Rd, 1st Stage, Kumaraswamy Layout, Bengaluru, Karnataka',
//     location: {
//         lat: 12.9100171,
//         lng: 77.5612242
//     },
//     creator: 'raj'

// }]


const UpdatePlace = () => {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    // const [isLoading, setIsLoading] = useState(true)
    const placeId = useParams().placeId
    const history = useHistory();
    // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)


    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true
                );
            } catch (err) { }
        }
        fetchPlace();
    }, [sendRequest, placeId, setFormData])
    // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    // useEffect(() => {
    //     if (identifiedPlace) {

    //     }
    //     setIsLoading(false)
    // }, [setFormData, identifiedPlace]);


    const placeUpdateSubmitHandler = async event => {
        event.preventDefault()
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value

                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            history.push('/' + auth.userId + '/places');
        } catch (err) { }
        // console.log(formState.inputs)
    }

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedPlace && !error) {
        return (

            <div className='center'>
                <Card>
                    <h2> Could not find place!</h2>
                </Card>
            </div>

        )
    }



    return (
        // formState.inputs.title.value && (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please Enter a Valid Title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        // type="text"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please Enter a Valid Description (at least of 5 characters)"
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )
            }
        </React.Fragment>

    )
}

export default UpdatePlace