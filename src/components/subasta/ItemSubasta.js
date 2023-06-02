import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
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



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
        
        // if (estado == 'CERRADO') {
        //     handleClickOpenMsg();
        // }
        // else {


        //    if (fechaHora1 < fechaHora2) {
                if (props.IndicePanel == 0) {
                    history.push(`/Subasta/detalle/${props.Cab_cCatalogo}/${props.Dvm_cNummov}/${props.IndicePanel}/${props.Per_cPeriodo}`);
                }
                else {
                    handleClickOpenMsg();
                }

        //    } else {
       //         handleClickOpenMsg();
       //     }
      //  }

    }

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
                        src={`${props.cab_cenlace}?w=248&fit=crop&auto=format`}
                        srcSet={`${props.cab_cenlace}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={props.Cab_cDescripcion}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={`PUJAR POR: ${props.Placa}`}
                        subtitle={`PROPIETARIO:${props.Propietario}`}
                        actionicon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${props.Info}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                        position="below"

                    />
                    <Grid container spacing={1}>

                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                                {`INICIO: ${props.Dvd_dInicio}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                                {`FIN: ${props.Dvd_dFin}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Typography variant='caption' style={{ fontStyle: 'italic', fontWeight: 'bold' }} color={props.Estado === 'ACTIVO' ? 'primary' : 'error'}>
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

