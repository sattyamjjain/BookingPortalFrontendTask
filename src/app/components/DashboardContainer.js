import React from "react";
import { useSelector } from 'react-redux';
import { userActions } from '../_actions';
import {TextField,Drawer,Typography,Button,MenuItem} from '@material-ui/core';
import {Table,TableBody,Paper,TableContainer,TableHead,TableCell,TableRow,Snackbar} from '@material-ui/core';
import { Formik } from 'formik';
import MuiAlert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

const MainContainer = styled.div`
    padding:7vh;
`;

const HeadContainer = styled.div`
    display:flex;
    justify-content:space-between;
    padding-bottom:5vh;
`;

const DrawerContainer = styled.div`
    padding:5vh;
    width:60vh;
`;

const FormContainer = styled.div`
    padding-top:10vh;
`;

const SubMainContainer = styled.div`
    width:70%;
    padding:20px;
`;

const facilities = [
    {
      value: 'Tennis Court',
      label: 'Tennis Court',
    },
    {
      value: 'Swimming Pool',
      label: 'Swimming Pool',
    },
    {
      value: 'Badminton Court',
      label: 'Badminton Court',
    },
    {
      value: 'Gym',
      label: 'Gym',
    },
    {
      value: 'Club House',
      label: 'Club House',
    },
    {
      value: 'Cycle tracks',
      label: 'Cycle tracks',
    }
  ];

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function LoginContainer(){
    const [time,setTime] = React.useState(['10:00', '11:00'])
    const [facilityName,setFacilityName] = React.useState('Tennis Court')
    const [state, setState] = React.useState({
      right: false,
    });
    const [snack, setSnack] = React.useState('');
  
    const handleSnackClick = (value) => {
        setSnack(value);
    };
  
    const user = useSelector(state => state.authentication.user);

    const onTimeChange = time => setTime(time)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

    function handleFacilityNameChange(e) {
        setFacilityName(e.target.value);
    }

    function submitBookingForm(formValues) {
        const bookingDetails={
            bookingNo: "ngrsght48t",
            facilityName: facilityName,
            BookingDate: formValues.bookingDate,
            BookingTime: time[0]+' to '+time[1],
            bookedBy: user.name
        }

        const isAvailablebookingDetails={
            facilityName: facilityName,
            BookingDate: formValues.bookingDate,
            BookingTime: time[0]+' to '+time[1],
        }
        userActions.isAvailable(isAvailablebookingDetails).then(
            res=>{
                if(!res){
                    userActions.bookFacility(bookingDetails)
                    handleSnackClick('success')
                }else{
                    console.log('already booked')
                    handleSnackClick('error')
                }
            }
        )
        toggleDrawer('right', false)
    }
    
    const BookingForm = (anchor) => (
        <DrawerContainer>
            <Typography variant="h4" style={{textAlign:'center'}}>
                Book a Facility
            </Typography>
            <FormContainer>
                <Formik
                    initialValues={{ facilityName:'',bookingDate:''}}
                    onSubmit={submitBookingForm}
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
                                select
                                label="Facility Name"
                                fullWidth
                                value={facilityName}
                                onChange={handleFacilityNameChange}
                                >
                                    {facilities.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div style={{paddingTop:'10px'}}>
                                <TextField 
                                    fullWidth
                                    label="Booking Date (eg. 10 Nov, 2020)"
                                    type="bookingDate"
                                    name="bookingDate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bookingDate}
                                />
                            </div>
                            <div style={{paddingTop:'20px'}}>
                                <Typography variant="subtitle2">Select Time Range</Typography>
                            </div>
                            <div style={{paddingTop:'20px',display:'flex',justifyContent:'center'}}>
                                <TimeRangePicker
                                disableClock={true}
                                onChange={onTimeChange}
                                value={time}
                                />
                            </div>
                            <div style={{paddingTop:'20px',display:'flex',justifyContent:'center'}}>
                                <Button variant="contained" type="submit" disabled={isSubmitting} color="primary">
                                    Book
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </FormContainer>
        </DrawerContainer>
      );
    return (
        <MainContainer>
            <HeadContainer>
                <Typography variant="h4"> Dashboard</Typography>
                <Button variant="contained" color="primary" onClick={toggleDrawer('right', true)} >Book Facility</Button>
            </HeadContainer>
            <SubMainContainer>
                <Typography variant="h6">List of All Facilities</Typography>
                    <TableContainer component={Paper} style={{marginTop:'20px'}}>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Facility Name</TableCell>
                                <TableCell align="center">Facility Description</TableCell>
                                <TableCell align="center">Rules</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        Tennis Court
                                    </TableCell>
                                    <TableCell align="center">Tennis Court Description</TableCell>
                                    <TableCell align="center">1. Rules</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        Swimming Pool
                                    </TableCell>
                                    <TableCell align="center">Swimming Pool Description</TableCell>
                                    <TableCell align="center">1. Rules</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        Badminton Court
                                    </TableCell>
                                    <TableCell align="center">Badminton Court Description</TableCell>
                                    <TableCell align="center">1. Rules</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        Gym
                                    </TableCell>
                                    <TableCell align="center">Gym Description</TableCell>
                                    <TableCell align="center">1. Rules</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        Club House
                                    </TableCell>
                                    <TableCell align="center">Club House Description</TableCell>
                                    <TableCell align="center">1. Rules</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        Cycle tracks
                                    </TableCell>
                                    <TableCell align="center">Cycle tracks Description</TableCell>
                                    <TableCell align="center">1. Rules</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </SubMainContainer>
            <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
                {BookingForm('right')}
            </Drawer>
            <Snackbar open={snack==='success'} autoHideDuration={6000}>
                <Alert severity="success">
                    Booking Succesfull
                </Alert>
            </Snackbar>
            <Snackbar open={snack==='error'} autoHideDuration={6000}>
                <Alert severity="error">
                    Selected Facility is already booked
                </Alert>
            </Snackbar>
        </MainContainer>
    );
}
