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


const ItemDetalle = (props) => {

    const history = useHistory();

    const location = useLocation();
    const myObject = location.state.props;


    const [imagenesSlide, setImagenesSlide] = React.useState([]);


    const obtenerSubastaSlider = async () => {
        return await subastaService.obtenerSubastaSlider().then(
            (res) => {
                console.log(res)
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

    const imagesCarousel = [
        { id: '1', titulo: 'Awesome forest', imagen: 'https://cdn.pixabay.com/photo/2020/11/09/15/12/trail-5726987_960_720.jpg', },
        { id: '2', titulo: 'A litle bird.', imagen: 'https://cdn.pixabay.com/photo/2011/09/27/18/52/bird-9950_960_720.jpg', },
        { id: '3', titulo: 'The best friend.', imagen: 'https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751_960_720.jpg', },
        { id: '4', titulo: 'Beautiful desert.', imagen: 'https://cdn.pixabay.com/photo/2016/11/21/17/44/arches-national-park-1846759_960_720.jpg', },
        { id: '5', titulo: 'Harley Davidson motorcycle.', imagen: 'https://cdn.pixabay.com/photo/2018/10/26/22/55/harley-davidson-3775527_960_720.jpg', },
    ]

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
                        <ButtonBase sx={{ width: 150, height: 150 }}>
                            <Img alt="complex" src={myObject.imagen} onClick={obtenerSubastaSlider} />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>

                                    <ItemCarousel images={imagenesSlide} />
                                    {/* <Img alt="complex" src={myObject.imagen} onClick={handleOpen} /> */}
                                </Box>
                            </Modal>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} a>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" align="left">
                                    <b>Placa: {myObject.placa} - PUJAR POR N° {myObject.id}</b>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {/* <p><b>Propietario</b>: {myObject.propietario}</p> */}

                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <p><b>Propietario</b>: {myObject.propietario}</p>
                                    <p><b>Padre:</b> {myObject.padre}</p>
                                    <p><b>Madre:</b> {myObject.madre}</p>
                                    <p><b>Info:</b> {myObject.info}</p>
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="div" color="primary">
                                <b>Precio Base : S/. {myObject.precio}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ItemDetalle;
