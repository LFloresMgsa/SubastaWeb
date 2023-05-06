import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';


const ItemTienda = (props) => {

    const history = useHistory();

    return (
        <div>


            <Paper
                sx={{
                    p: 1,
                    margin: 0.5,
                    maxWidth: 'auto',
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <ImageListItem >

                    <table>
                        <tbody>
                            <tr>
                                <td>

                                    <img
                                        src={`${props.cab_cenlace}?w=248&fit=crop&auto=format`}
                                        srcSet={`${props.cab_cenlace}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={props.Cab_cDescripcion}
                                        loading="lazy"
                                        
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            <b>INFORMACION DEL EJEMPLAR</b>
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <p><b>Precio Base:</b> S/. {props.Dvd_nImporte}</p>
                                            <p><b>Placa:</b> {props.Placa}</p>
                                            <p><b>Propietario</b>: {props.Propietario}</p>
                                            <p><b>Padre:</b> {props.Padre}</p>
                                            <p><b>Madre:</b> {props.Madre}</p>
                                            <p><b>Info:</b> {props.Info}</p>
                                        </Typography>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </ImageListItem>
            </Paper>

        </div>
    );
};

export default ItemTienda;
