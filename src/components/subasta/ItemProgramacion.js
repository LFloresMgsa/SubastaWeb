import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { eventoService } from '../../services/evento.service';
import ItemSubasta from '../../components/subasta/ItemSubasta';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imagenes from '../../assets/images/imagenes';

import { storage } from "../../storage.js";

import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Itemprogramacion = (props) => {

    const [subastas, setSubastas] = React.useState([]);

    const obtenerEventoDetalle = async (pDvm_cNummov) => {
        let _body = { Accion: "EVENTO_DET", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov }


        return await eventoService.obtenerEventosDet(_body).then(

            (res) => {

                setSubastas(res[0])
            },
            (error) => {
                console.log(error);
            }
        );
    };


    useEffect(() => {



        obtenerEventoDetalle(props.Dvm_cNummov);

    }, []);

    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Calendar" src={imagenes[0].img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.Dvm_cDescripcion}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {`Inicio : ${props.Dvm_dInicio} - Término: ${props.Dvm_dFin}`}
                                </Typography>


                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <Grid container spacing={1}>
                {subastas.map((subasta) => (
                    <Grid item xs={12} lg={3} key={`${subasta.Dvm_cNummov}-${subasta.Cab_cCatalogo}`}>
                        <ItemSubasta key={subasta.Cab_cCatalogo} {...subasta} IndicePanel={props.IndicePanel} Per_cPeriodo={props.Per_cPeriodo} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Itemprogramacion;
