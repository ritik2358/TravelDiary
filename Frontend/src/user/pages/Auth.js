import React, { useState, useContext } from 'react'
import Card from '../../shared/components/UIelements/Card'
import Input from '../../shared/components/FormElements/Input'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import './Auth.css'



const Auth = () => {

    const auth = useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true)
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined
                }
                , formState.inputs.email.isValid && formState.inputs.password.isValid
            )
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async event => {
        event.preventDefault()

        console.log(formState.inputs);
        // console.log(formState.inputs)

        // setIsLoading(true);
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/login', 'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    });
                auth.login(responseData.userId, responseData.token);

                // const responseData = await response.json();
                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }
                // console.log(responseData)
                // setIsLoading(false);

            } catch (err) {
                //  console.log(err);
                // setIsLoading(false);
                // setError(err.message || 'Something went wrong, please try again')
            }
        }
        else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value)
                formData.append('name', formState.inputs.name.value)
                formData.append('password', formState.inputs.password.value)
                formData.append('image', formState.inputs.image.value)
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/users/signup', 'POST',
                    formData
                    // JSON.stringify({
                    //     name: formState.inputs.name.value,
                    //     email: formState.inputs.email.value,
                    //     password: formState.inputs.password.value
                    // })

                    // {
                    //     'Content-Type': 'application/json'
                    // }
                );
                // const responseData = await response.json();
                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }
                // console.log(responseData)
                // setIsLoading(false);
                auth.login(responseData.userId, responseData.token);
            } catch (err) {
                //  console.log(err);
                // setIsLoading(false);
                // setError(err.message || 'Something went wrong, please try again')
            }

        }

        // setIsLoading(false);

        // auth.login()
    }

    // const errorHandler = () => {
    //     setError(null);
    // }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name"
                            onInput={inputHandler}
                        />
                    )}
                    {!isLoginMode && (
                        <ImageUpload
                            center
                            id="image"
                            onInput={inputHandler}
                            errorText="Please provide an image"
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="PLease Enter a Valid E-mail Address"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="PLease Enter a Valid Password (at least 6 Characters)"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid} > {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth