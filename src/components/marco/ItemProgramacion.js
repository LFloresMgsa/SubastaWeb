import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { eventoService } from '../../services/evento.service';
import ItemSubasta from '../../components/marco/ItemSubasta';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imagenes from '../../assets/images/imagenes';

const Itemprogramacion = (props) => {

    const [subastas, setSubastas] = React.useState([]);

    const obtenerEventoDetalle = async (pDvm_cNummov) => {
        let _body = { Accion: "EVENTO_DET", Emp_cCodigo: "015", Pan_cAnio: "2023", Dvm_cNummov: pDvm_cNummov }


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

                                </Typography>
                                {`Inicio : ${props.Dvm_dInicio} - Termino: ${props.Dvm_dFin}`}

                            </React.Fragment>
                        }
                    />
                </ListItem>
                
            </List>

            <ImageList className="subasta-item" cols={4}>
                <ImageListItem key="Subheader" sx={{ width: "100%", height: 450 }} cols={4} >

                </ImageListItem>
                {subastas.map((subasta) => (
                    <ItemSubasta key={subasta.Cab_cCatalogo} {...subasta} IndicePanel = {props.IndicePanel}/>
                ))}

            </ImageList>


        </div>
    );
};

export default Itemprogramacion;
