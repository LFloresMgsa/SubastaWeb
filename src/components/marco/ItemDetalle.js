import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const ItemDetalle = (props) => {

    const history = useHistory();

    const location = useLocation();
    const myObject = location.state.props;

    const handleRegresarSubasta = () => {

        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/Subasta'

        });
    }
    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    margin: 1,
                    maxWidth: 'auto',
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 150, height: 150 }}>
                            <Img alt="complex" src={myObject.imagen} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} a>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" align="left">
                                    <b>Placa: {myObject.placa} - PUJAR POR N° {myObject.id}</b>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {/* <p><b>Propietario</b>: {myObject.propietario}</p> */}

                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <p><b>Propietario</b>: {myObject.propietario}</p>
                                    <p><b>Padre:</b> {myObject.padre}</p>
                                    <p><b>Madre:</b> {myObject.madre}</p>

                                    <p><b>Info:</b> {myObject.info}</p>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    <Button onClick={handleRegresarSubasta}>Regresar</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="div">
                                <b>Precio Base : S/. {myObject.precio}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>




            </Paper>
        </div>
    );
};

export default ItemDetalle;
