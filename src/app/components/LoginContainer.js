import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import {Alert} from '@material-ui/lab';
import {TextField,Typography,Button} from '@material-ui/core';
import { Formik } from 'formik';
import styled from 'styled-components';

const MainContainer = styled.div`
    padding-top:15vh;
    width:100%;
    text-align:center;
`;

const FormContainer = styled.div`
    display:flex;
    justify-content:center;
    width:100%;
    text-align:center;
`;

export default function LoginContainer(){
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleSubmit(formValues) {
        setSubmitted(true);
        if (formValues.username && formValues.password) {
            dispatch(userActions.login(formValues.username, formValues.password));
        }
    }
    return (
        <MainContainer>
            <Typography variant="h4" style={{textAlign:'center'}}>
                Login
            </Typography>
            <FormContainer>
            <Formik
                initialValues={{ username:'',password:''}}
                onSubmit={handleSubmit}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div style={{paddingTop:'10px'}}>
                            <TextField 
                                fullWidth
                                label="Username"
                                type="username"
                                name="username"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            {submitted && !touched.username &&
                            <Alert severity="error">Username is required</Alert>
                            }
                        </div>
                        <div style={{paddingTop:'10px'}}>
                            <TextField 
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {submitted && !touched.password &&
                            <Alert severity="error">Password is required</Alert>
                            }
                        </div>
                        <div style={{paddingTop:'20px'}}>
                            <Button variant="contained" fullWidth={true} type="submit" disabled={isSubmitting} color="primary">
                                Login
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </FormContainer>
    </MainContainer>
    );
}
