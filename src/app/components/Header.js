/* eslint-disable no-sequences */
import React from "react";
import styled from 'styled-components';
import {AppBar,Toolbar,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import {
  Link
} from "react-router-dom";

const HeaderMainContainer = styled.div`
  width:100%;
`;

const useStyles = makeStyles((theme) => ({
  button:{
    textTransform:'capitalize',
    '&:focus':{
      oultine:'none',
      border:'none'
    }
  }
}));

export default function Header () {
  const classes = useStyles();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(userActions.logout());
  }
  return (
    <HeaderMainContainer>
        <AppBar position="static">
          <Toolbar style={{justifyContent:'flex-end'}}>
            {
              localStorage.getItem('user')?
                <Button color="inherit" className={classes.button} onClick={logoutUser}>Logout</Button>
              :
              <>
                <Button color="inherit" className={classes.button}><Link to="/login" style={{color:'inherit'}}>Login</Link></Button>
                {/* <Button color="inherit" className={classes.button}><Link to="/register" style={{color:'inherit'}}>Register</Link></Button> */}
              </>
            }
          </Toolbar>
        </AppBar>
    </HeaderMainContainer>
  );
};
