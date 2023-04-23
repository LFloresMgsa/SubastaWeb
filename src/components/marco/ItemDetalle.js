import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ItemCarousel from './ItemCarousel';
import { subastaService } from '../../services/subasta.service';
import { eventoService } from '../../services/evento.service';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


// Función para hacer la solicitud a la API
const obtenerDetalleEvento = async () => {
    try {
        const body = {
            Accion: "EVENTO_DET",
            Emp_cCodigo: "015",
            Pan_cAnio: "2023",
            Dvm_cNummov: "0000000003",
            Cab_cCatalogo: "000004"
        };

        const response = await eventoService.obtenerEventosDet(body);

        // Si el valor de la respuesta no es válido, lanzar un error
        if (!response || response.length === 0) {
            throw new Error("Respuesta inválida de la API");
        }

        return response[0];


    } catch (error) {
        // Agregar un manejo de errores más robusto aquí
        console.log(error);
        throw error; // Lanzar el error para que el componente lo pueda manejar
    }
};


const ItemDetalle = () => {



    // const [imagenesSlide, setImagenesSlide] = React.useState([]);
    // const [detalleX, setDetalleX] = React.useState([]);

    const [detalle, setDetalleEvento] = React.useState([]);


    useEffect(() => {
        const fetchDetalleEvento = async () => {
            const detalleEvento = await obtenerDetalleEvento();

            setDetalleEvento(detalleEvento);
        };

        fetchDetalleEvento();



    }, []);


    // console.log("----------------w");

    // console.log("----------------w");

    //
    //           
    //    }, [detalle]);




    // }    // const obtenerEventosDet = async () => {

    //     let _body = { Accion: "EVENTO_DET", Emp_cCodigo: "015", Pan_cAnio:"2023" , Dvm_cNummov:"0000000003", Cab_cCatalogo: "000004"}

    //       eventoService.obtenerEventosDet(_body).then(
    //        (res) => {
    //          setDetalle(res[0])
    //        },
    //        (error) => {
    //          console.log(error);
    //        }
    //     );    
    // }

    // const obtenerSubastaSlider = async () => {
    //     return await subastaService.obtenerSubastaSlider().then(
    //         (res) => {
    //             console.log(res)
    //             setImagenesSlide(res)
    //             handleOpen()
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // };







    // const obtenerSubastaSlider = async () => {
    //     let _body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: "015",  Cab_cCatalogo: "000003"}

    //     return await eventoService.obtenerCatalogoDetImagenes(_body).then(
    //        (res) => {
    //          console.log(res)
    //          setImagenesSlide(res[0])
    //        },
    //        (error) => {
    //          console.log(error);
    //        }
    //     );
    // };

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

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

                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} a>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" align="left">

                                    <b>Placa:{detalle.Placa}</b>

                                    {/* <b>Placa: {detalle.Placa} - PUJAR POR N° {detalle.Cab_cCatalogo}</b>  s */}
                                    {/* <b> {detalle.Per_cPeriodo.toString()} </b> */}

                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {/* <p><b>Propietario</b>: {detalle.propietario}</p> */}
                                    <b>Propietario:</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>Padre:</b>
                                    {/* <p><b>Propietario</b>: {detalle.propietario}</p>
                                    <p><b>Padre:</b> {detalle.padre}</p>
                                    <p><b>Madre:</b> {detalle.madre}</p>
                                    <p><b>Info:</b> {detalle.info}</p> */}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="div" color="primary">
                                <b>Precio:</b>
                                {/* <b>Precio Base : S/. {detalle.precio}</b> */}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ItemDetalle;
