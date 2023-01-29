import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const ItemDetalleModal = (props) => {
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


  return (
    <div>
        <Button onClick={handleOpen}>Ver</Button>
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
            <p><b>Precio Base:</b></p>
            <p>Placa:</p>
            <p>Propietario:</p>
            <p>Padre:</p>
            <p>Madre:</p>
            <p>Info:</p>
          </Typography>
        </Box>
      </Modal>        
     
    </div>
  );
};

export default ItemDetalleModal;
