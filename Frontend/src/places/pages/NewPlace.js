import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import Input from '../../shared/components/FormElements/Input'
import './NewPlace.css'
import Button from './../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './NewPlace.css'
const NewPlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false
    );

    const history = useHistory();

    const placeSubmitHandler = async event => {
        event.preventDefault()
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            // formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 'POST', formData, {
                Authorization: 'Bearer ' + auth.token
            });
            // JSON.stringify({
            //     title: formState.inputs.title.value,
            //     description: formState.inputs.description.value,
            //     address: formState.inputs.address.value,
            //     creator: auth.userId
            // }),
            // { 'Content-Type': 'application/json' }
            history.push('/');
            // Redirect the user to a different page
        } catch (err) {

        }
        // console.log(formState.inputs)
    }
    // const descriptionInputHandler = useCallback((id, value, isValid) => { }, [])

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter a Valid title"
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    // type="text" 
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please Enter a Valid Description (at least 5 characters)"
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    // type="text" 
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter a Valid Address"
                    onInput={inputHandler}
                />
                <ImageUpload
                    id="image"
                    onInput={inputHandler} errorText="Please provide an image"
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    )
}

export default NewPlace