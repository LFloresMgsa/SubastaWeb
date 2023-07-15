import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';


import Medalla from '@mui/icons-material/GavelRounded';


import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../services/evento.service';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';

import { storage } from "../../storage.js";

import imagenes from '../../components/subasta/imagenes.js'

import barra from '../../assets/images/barra.jpg'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};


const Item = (props) => {

    

    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    const [serverTime, setServerTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpenMsg = () => setOpenMsg(true);
    const handleCloseMsg = () => setOpenMsg(false);

    const fetchServerTime = async () => {
        try {

            let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }

            return await eventoService.horaservidor(_body).then(
                (res) => {
                    const timeString = res.time;
                    const [hours, minutes, seconds] = timeString.split(':');
                    const date = new Date();
                    date.setHours(hours);
                    date.setMinutes(minutes);
                    date.setSeconds(seconds);

                    setCurrentTime(date);
                },
                (error) => {
                    console.log(error);

                }
            );


        } catch (error) {
            console.error('Error fetching server time:', error);
        }
    };

    const handleVerDetalle = async () => {

        await fetchServerTime();

        const fechaHora1 = currentTime;
        const fechaHora2 = new Date(props.Final);

        const estado = props.Estado;
        //console.log(fechaHora1);
        //console.log(fechaHora2);

        if (estado == 'CERRADO') {
            handleClickOpenMsg();
        }
        else {


            //      if (fechaHora1 < fechaHora2) {
            if (props.IndicePanel == 0) {
                history.push(`/Subasta/detalle/${props.Cab_cCatalogo}/${props.Dvm_cNummov}/${props.IndicePanel}/${props.Per_cPeriodo}`);
            }
            else {
                handleClickOpenMsg();


            }

            //    } else {
            //handleClickOpenMsg();
            //}
        }

    }

    //const [subastasDet, setSubastasDet] = React.useState([]);
    const [nPujas, setnPujas] = React.useState(0);

    const obtenerEventoDetalleSel = async (pDvm_cNummov, pCab_cCatalogo) => {
        let _body = { Accion: "EVENTO_DET_PUJA", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo:pCab_cCatalogo }
        let _result;

        return await eventoService.obtenerEventosDet(_body).then(

            (res) => {
                _result = res[0];
                _result.map((item) => (
                    setnPujas(item.pujas)
                ))                
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleIconButtonClick = () => {
        // Lógica que se ejecutará al hacer clic en el IconButton
        obtenerEventoDetalleSel (props.Dvm_cNummov, props.Cab_cCatalogo)
        
      };

      useEffect(() => {
        setnPujas(props.pujas);
    }, []);

    return (
        <div>

            <Dialog open={openMsg} onClose={handleCloseMsg} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Puja"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Solo se puede iniciar una Puja activa.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMsg} autoFocus >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

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

                    <img
                        //src={props.cab_cenlace}
                        src={`../../assets/images/barra.jpg`}
                        srcSet={`../../assets/images/barra.jpg`}

                        loading="lazy"
                    />

                    <ImageListItemBar

                        sx={{
                            background:
                                'white',
                            "& .MuiImageListItemBar-title": { color: "black" }, //styles for title                                
                        }}

                        title={` Pujas : ${nPujas}`}

                        actionIcon={
                            <IconButton
                                sx={{ color: 'black' }}
                                aria-label={`star ${props.pujas}`}
                                onClick={ handleIconButtonClick} 
                            >
                                <Medalla />
                            </IconButton>
                        }
                        position="top"
                        actionPosition="left"

                    />
                </ImageListItem>


                <ImageListItem >
                    <img
                        //src={props.cab_cenlace}
                        src={`${props.cab_cenlace}?w=248&fit=crop&auto=format`}
                        srcSet={`${props.cab_cenlace}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={props.Cab_cDescripcion}
                        loading="lazy"
                    />

                    <Grid container spacing={1}>


                        <Grid item xs={12} lg={12}>
                            <Typography variant='body1' style={{ fontStyle: 'normal', fontWeight: 'bold' }}>
                                {`PUJAR POR: ${props.Placa}`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'normal', fontWeight: 'normal' }}>
                                {`PROPIETARIO:${props.Propietario}`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'normal', fontWeight: 'normal' }}>
                                {`INICIO: ${props.Dvd_dInicio}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'normal', fontWeight: 'normal' }}>
                                {`FIN: ${props.Dvd_dFin}`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'normal', fontWeight: 'bold' }} color={props.Estado === 'ACTIVO' ? 'primary' : 'error'}>
                                {`ESTADO: ${props.Estado}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} lg={6}>


                                    <Button variant="outlined" size="small" color="primary" onClick={handleOpen}>Detalles</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <h3><b>INFORMACION:</b></h3>
                                            <p><b>Precio Base:</b> S/. {props.Dvd_nImporte}</p>
                                            <p><b>Placa:</b> {props.Placa}</p>
                                            <p><b>Propietario</b>: {props.Propietario}</p>
                                            <p><b>Padre:</b> {props.Padre}</p>
                                            <p><b>Madre:</b> {props.Madre}</p>
                                            <p><b>Edad:</b> {props.Info}</p>
                                            <p><b>Detalles:</b> {props.Cab_cDescripcion}</p>
                                            <p><b>Observaciones:</b> {props.Cab_cObservaciones}</p>


                                        </Box>
                                    </Modal>

                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Button variant="contained" size="small" color="primary" onClick={handleVerDetalle}  >Pujar</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ImageListItem>
            </Paper>

        </div>
    );
};

export default Item;

