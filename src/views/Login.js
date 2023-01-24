import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useInputValue } from '../helpers/hooks/useInputValue';
import { store } from '../store';
import { handleResponse } from '../helpers';
import Loading from '../components/common/others/Loading';

const useStyles = makeStyles((theme, context) => ({
  root: {
    padding: '5px',
    margin: '0 auto',

    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },

    [theme.breakpoints.only('xs')]: {
      '& h2': {
        position: 'relative',
        top: '-10px',
      },
    },

    '& .portalLogo': {
      // padding: '20px 20px',
      width: '100%',
      textAlign: 'center',

      '& img': {
        maxWidth: '100%',
        maxHeight: '100%',
      },
    },

    '& .MuiCard-root': {
      padding: '20px',
    },

    '& .separator': {
      marginRight: '10px',
      marginLeft: '10px',
    },

    '& .link': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },

    '& .forgot-password': {
      marginTop: '20px',
      textAlign: 'center',
    },
    '& .need-register': {
      marginTop: '0px',
      textAlign: 'center',
    },
  },
}));

const initialState = () => {
  return {
    isSubmitting: false,
    username: '',
    password: '',
    portalID: -1,
    error: false,
    userError: false,
    passError: false,
  };
};

const Login = (props) => {
  const mountedRef = useRef(true);
  const classes = useStyles();
  const { global, currentUser } = store.getState();
  const [currentLogin, setCurrentLogin] = useState('');
  const [state, setState] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState('');

  let username = useInputValue(state.username, state.userError);
  let password = useInputValue(state.password, state.passError);

  let portalLogoSRC;
  if (global.logoFile) {
    try {
      portalLogoSRC = require(`../assets/portals/${global.portalID}/${global.logoFile}`);
    } catch (error) {
      portalLogoSRC = '';
    }
  }

  useEffect(() => {
    props.history.push('/login');
    store.dispatch({
      type: 'SET_SHOW_LOGIN',
      payload: false,
    });

    if (!mountedRef.current) return null;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loginUser = async (loginPayload) => {
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    };

    return await fetch(`${SERVICE_URL}/users/authenticate`, requestOptions)
      .then(handleResponse)
      .then(({ currentUser: loggedUser, token }) => {
        store.dispatch({
          type: 'pushNewAlert',
          payload: {
            open: true,
            color: 'success',
            message: 'Login was successful!',
            onLogin: true,
          },
        });
        return { loggedUser, token };
      })
      .catch((error) => {
        let errorMsg = error.title || error.message || error;
        store.dispatch({
          type: 'pushNewAlert',
          payload: {
            open: true,
            color: 'error',
            message: '[Replace]' + errorMsg,
            keepOpen: true,
          },
        });
        setState({
          ...state,
          userError: error.errors?.Username,
          passError: error.errors?.Password,
          isSubmitting: false,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, isSubmitting: true });
    const { isSubmitting, ...payload } = { ...state };
    payload.username = username.value;
    payload.password = password.value;

    try {
      //loginUser action makes the request and handles all the neccessary state changes
      let response = await loginUser({
        username: payload.username,
        password: payload.password,
      });
      if (!response) return;

      setTimeout(() => {
        store.dispatch({ type: 'clearAlerts' });
        props.history.push('/dashboard');
        localStorage.setItem('NSUserInfo', JSON.stringify(response.loggedUser));
        store.dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { ...response.loggedUser },
          onLogin: true,
        });
        store.dispatch({
          type: 'SET_GLOBALS',
          payload: {
            isAuthenticated: true,
            portalID: global.portalID,
            superUserId: global.superUserId,
            portalName: global.portalName,
          },
        });
        store.dispatch({
          type: 'SET_ACCESS_TOKEN',
          payload: {
            token: response.token,
            onLogin: true,
          },
        });
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        {!currentUser.detail && (
          <React.Fragment>
            <div className="portalLogo">
              {portalLogoSRC ? (
                <img src={portalLogoSRC} alt="Logo" />
              ) : (
                <h3>{global.portalName}</h3>
              )}
            </div>
            <Card>
              <div className="view-title">Login</div>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  helperText={fieldErrors.userName}
                  {...username}
                />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  error={password.error && fieldErrors.password ? true : false}
                  helperText={fieldErrors.password}
                  {...password}
                />
                <br />
                <br />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={state.isSubmitting}
                >
                  Login {state.isSubmitting && <Loading forButton lpad />}
                </Button>
                <br />
              </form>
            </Card>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Login;
