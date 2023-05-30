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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpenMsg = () => setOpenMsg(true);
    const handleCloseMsg = () => setOpenMsg(false);


    const handleVerDetalle = () => {
        if (props.IndicePanel == 0) {
            history.push(`/Subasta/detalle/${props.Cab_cCatalogo}/${props.Dvm_cNummov}/${props.IndicePanel}/${props.Per_cPeriodo}`);
        }
        else {
            handleClickOpenMsg();
        }
    }

    return (
        <div>

            <Dialog open={openMsg} onClose={handleCloseMsg} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Subasta"}
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
                    <table>
                        <tbody>
                            <tr>
                                <td>

                                    <Button variant="outlined" size="small" color="primary" onClick={handleOpen}>Detalles</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <h3>
                                            <b>INFORMACION:</b></h3>
                                            <p><b>Precio Base:</b> S/. {props.Dvd_nImporte}</p>
                                            <p><b>Placa:</b> {props.Placa}</p>
                                            <p><b>Propietario</b>: {props.Propietario}</p>
                                            <p><b>Padre:</b> {props.Padre}</p>
                                            <p><b>Madre:</b> {props.Madre}</p>
                                            <p><b>Info:</b> {props.Info}</p>

                                        </Box>
                                    </Modal>

                                </td>
                                <td>
                                    <p>-</p>

                                </td>
                                <td>
                                    <Button variant="contained" size="small" color="primary" onClick={handleVerDetalle}  >Pujar</Button>

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

