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
import { eventoService } from '../../services/evento.service';

import { storage } from "../../storage.js";

import img1020 from '../../assets/ejemplares/1020.jpg'
import img1032 from '../../assets/ejemplares/1032.jpg'
import img1054 from '../../assets/ejemplares/1054.jpg'
import img1056 from '../../assets/ejemplares/1056.jpg'
import img7302 from '../../assets/ejemplares/7302.jpg'
import img7399 from '../../assets/ejemplares/7399.jpg'
import img7610 from '../../assets/ejemplares/7610.jpg'
import img7656 from '../../assets/ejemplares/7656.jpg'
import img7664 from '../../assets/ejemplares/7664.jpg'
import img7680 from '../../assets/ejemplares/7680.jpg'
import img7699 from '../../assets/ejemplares/7699.jpg'
import img7796 from '../../assets/ejemplares/7796.jpg'
import img7799 from '../../assets/ejemplares/7799.jpg'
import img7821 from '../../assets/ejemplares/7821.jpg'
import img7874 from '../../assets/ejemplares/7874.jpg'
import img7905 from '../../assets/ejemplares/7905.jpg'
import img7906 from '../../assets/ejemplares/7906.jpg'
import img7908 from '../../assets/ejemplares/7908.jpg'
import img7935 from '../../assets/ejemplares/7935.jpg'
import img7936 from '../../assets/ejemplares/7936.jpg'
import img7945 from '../../assets/ejemplares/7945.jpg'
import img7946 from '../../assets/ejemplares/7946.jpg'
import img7961 from '../../assets/ejemplares/7961.jpg'
import img8038 from '../../assets/ejemplares/8038.jpg'
import img8039 from '../../assets/ejemplares/8039.jpg'
import img8053 from '../../assets/ejemplares/8053.jpg'
import img8057 from '../../assets/ejemplares/8057.jpg'
import img8075 from '../../assets/ejemplares/8075.jpg'
import img8128 from '../../assets/ejemplares/8128.jpg'
import img8163 from '../../assets/ejemplares/8163.jpg'

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
const obtenerDetalleEvento = async (pCab_cCatalogo, pDvm_cNummov) => {
    try {
        const body = { Accion: "EVENTO_DET", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo };

        const response = await eventoService.obtenerEventosDet(body);

        if (!response || response.length === 0) {
            throw new Error("Respuesta inválida de la API");
        }

        return response[0];

    } catch (error) {
        console.log(error);
        throw error; // Lanzar el error para que el componente lo pueda manejar
    }
};

const obtenerImagenes = async (pCab_cCatalogo, pDvm_cNummov) => {
    try {
        const body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo };


        const response = await eventoService.obtenerCatalogoDetImagenes(body);

        if (!response || response.length === 0) {
            throw new Error("Respuesta inválida de la API");
        }

        return response[0];

    } catch (error) {
        console.log(error);
        throw error; // Lanzar el error para que el componente lo pueda manejar
    }
};

const ItemDetalle = (props) => {


    const [imagenesSlide, setImagenesSlide] = React.useState([]);
    const [detalle, setDetalleEvento] = React.useState([]);


    useEffect(() => {
        const fetchDetalleEvento = async (pCab_cCatalogo, pDvm_cNummov) => {
            const detalleEvento = await obtenerDetalleEvento(pCab_cCatalogo, pDvm_cNummov);


            setDetalleEvento(detalleEvento[0]);

        };

        fetchDetalleEvento(props.pCab_cCatalogo, props.pDvm_cNummov);

    }, []);


    useEffect(() => {



        //  console.log(detalle);
    }, [detalle]);


    const obtenerSubastaSlider = async () => {
        return await obtenerImagenes(props.pCab_cCatalogo, props.pDvm_cNummov).then(
            (res) => {

                setImagenesSlide(res)
                handleOpen()
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



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
                    <Grid item sx={{ width: 200, height: 200 }}>
                        {/* <Img alt="imagen" src={`../../../${detalle.cab_cenlace}`} /> */}
                        <ButtonBase sx={{ width: 150, height: 150 }}>
                            
                            
                            
                            <Img alt="imagen" src={`../../../${detalle.cab_cenlace}`} onClick={obtenerSubastaSlider} /> 
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>

                                    <ItemCarousel images={detalle} />

                                </Box>
                            </Modal>
                        </ButtonBase>  
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} >
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" align="left">

                                    <b>PUJAR POR N° {detalle.Placa}</b>

                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Propietario</b>: {detalle.Propietario}

                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>Padre:</b> {detalle.Padre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>Madre:</b> {detalle.Madre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>Info:</b> {detalle.Info}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <b>Codigo:</b> {detalle.Cab_cCatalogo}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="div" color="primary">

                                <b>Precio Base : S/. {detalle.Dvd_nImporte}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ItemDetalle;
