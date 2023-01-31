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
import { useHistory } from 'react-router-dom';

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleVerDetalle = () => {
        history.push({
            pathname: '/SubastaDetalle',
            state: { props }
        });
    }

    return (
        <ImageListItem >
            <img
                src={`${props.imagen}?w=248&fit=crop&auto=format`}
                srcSet={`${props.imagen}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={props.nombre}
                loading="lazy"
            />
            <ImageListItemBar
                title={`${props.placa} - PUJAR POR N° ${props.id} `}
                subtitle={props.propietario}
                actionicon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${props.info}`}
                    >
                        <InfoIcon />
                    </IconButton>
                }
                position="below"

            />
            <table>
                <tr>
                    <th>

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
                                    <p><b>Precio Base:</b> S/. {props.precio}</p>
                                    <p><b>Placa:</b> {props.placa}</p>
                                    <p><b>Propietario</b>: {props.propietario}</p>
                                    <p><b>Padre:</b> {props.padre}</p>
                                    <p><b>Madre:</b> {props.madre}</p>
                                    <p><b>Info:</b> {props.info}</p>
                                </Typography>
                            </Box>
                        </Modal>

                    </th>

                    <th>
                        <Button variant="contained" size="small" color="primary" onClick={handleVerDetalle}>Subasta</Button>
                    </th>
                </tr>
            </table>
        </ImageListItem>
    );
};

export default Item;
