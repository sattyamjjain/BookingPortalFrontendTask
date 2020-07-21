import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import {TextField,Typography,Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { Formik } from 'formik';
import styled from 'styled-components';

const MainContainer = styled.div`
    padding-top:15vh;
    padding-left:35vh;
    padding-right:35vh;
    text-align:center;
`;

const FormContainer = styled.div`
    padding-top:5vh;
`;

export default function RegisterContainer (){
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleSubmit(formValues) {
        console.log('user',formValues)
        setSubmitted(true);
        if(formValues.password===formValues.confirmPassword){
            if (formValues.name && formValues.username && formValues.email && formValues.password) {
                dispatch(userActions.register(formValues));
            }
        }else{
            console.log('password unmatch')
        }
    }
    return (
        <MainContainer>
            <Typography variant="h4" style={{textAlign:'center'}}>
                Register
            </Typography>
            <FormContainer>
            <Formik
                initialValues={{
                    name:'',
                    username:'',
                    email:'',
                    apartmentNo:'',
                    password:'',
                    confirmPassword:''
                }}
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
                    <form >
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div style={{width:'45%'}}>
                                <div style={{paddingTop:'10px'}}>
                                    <TextField 
                                        fullWidth
                                        label="Full Name"
                                        type="name"
                                        name="name"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {submitted && !touched.name &&
                                    <Alert severity="error">Name is required</Alert>
                                    }
                                </div>
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
                                        label="Email"
                                        type="email"
                                        name="email"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {submitted && !touched.email &&
                                    <Alert severity="error">Email is required</Alert>
                                    }
                                </div>
                                <div style={{paddingTop:'10px'}}>
                                    <TextField 
                                        fullWidth
                                        label="Apartment No."
                                        type="apartmentNo"
                                        name="apartmentNo"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.apartmentNo}
                                    />
                                    {submitted && !touched.apartmentNo &&
                                    <Alert severity="error">Apartment No. is required</Alert>
                                    }
                                </div>
                            </div>
                            <div style={{width:'45%'}}>
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
                                <div style={{paddingTop:'10px'}}>
                                    <TextField 
                                        fullWidth
                                        label="Confirm Password"
                                        type="confirmPassword"
                                        name="confirmPassword"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                    {submitted && !touched.confirmPassword &&
                                    <Alert severity="error">Confirm Password is required</Alert>
                                    }
                                </div>
                                <div style={{paddingTop:'20px'}}>
                                    <Typography variant="caption">
                                        I agree to the Privacy Policy and Terms and Conditions.
                                    </Typography>
                                </div>
                                <div style={{paddingTop:'20px'}}>
                                    <Button variant="contained" type="submit" disabled={isSubmitting} color="primary" onClick={handleSubmit} style={{width:'50%'}}>
                                        Register 
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </FormContainer>
    </MainContainer>
    );
}