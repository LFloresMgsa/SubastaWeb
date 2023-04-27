import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Item = (props) => {

    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpenMsg = () => setOpenMsg(true);
    const handleCloseMsg = () => setOpenMsg(false);


    const handleVerDetalle = () => {

        if (props.IndicePanel == 0) {
            history.push(`/Subasta/detalle/${props.Cab_cCatalogo}/${props.Dvm_cNummov}/${props.IndicePanel}`);
        }
        else {
            handleClickOpenMsg();
        }
    }

    return (
        <div>

            <Dialog open={openMsg} onClose={handleCloseMsg} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Iniciar Subasta"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Solo se puede iniciar una subasta activa.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMsg} autoFocus>
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
                        src={`${props.cab_cenlace}?w=248&fit=crop&auto=format`}
                        srcSet={`${props.cab_cenlace}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={props.Cab_cDescripcion}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={`${props.Placa} - PUJAR POR N° ${props.Cab_cCatalogo} `}
                        subtitle={props.Propietario}
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
                    <table>
                        <tbody>
                            <tr>
                                <td>

                                    <Button variant="contained" size="small" color="primary" onClick={handleOpen}>Resumen</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
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
                                        </Box>
                                    </Modal>

                                </td>

                                <td>
                                    <Button variant="contained" size="small" color="primary" onClick={handleVerDetalle}  >Subasta</Button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ImageListItem>
            </Paper>

        </div>
    );
};

export default Item;
