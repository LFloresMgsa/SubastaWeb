import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ItemCarousel from './ItemCarousel';
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


const obtenerImagenes = async (pCab_cCatalogo) => {
    try {
        const body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: "015", Pan_cAnio: "", Cab_cCatalogo: pCab_cCatalogo };


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

const ItemTienda = (props) => {

    const history = useHistory();
    const [imagenesSlide, setImagenesSlide] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    const obtenerSubastaSlider = async () => {
        return await obtenerImagenes(props.Cab_cCatalogo).then(
            (res) => {

                setImagenesSlide(res)
                handleOpen()
            },
            (error) => {
                console.log(error);
            }
        );
    };


    return (
        <div>


            <Paper
                sx={{
                    p: 1,
                    margin: 0.5,
                    maxWidth: 'auto',
                    width: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <ImageListItem >

                    <table>

                        <tbody>
                            <tr>
                                <td>
                                    <ButtonBase sx={{ width: 480, height: 480 }}>
                                        <Img alt="complex" src={props.cab_cenlace} onClick={obtenerSubastaSlider} />
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>

                                                <ItemCarousel images={imagenesSlide} />

                                            </Box>
                                        </Modal>
                                    </ButtonBase>


                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2>
                                        <b>INFORMACION DEL EJEMPLAR</b>
                                    </h2>

                                    <p><b>Precio Base:</b> S/. {props.Dvd_nImporte}</p>
                                    <p><b>Placa:</b> {props.Placa}</p>
                                    <p><b>Propietario</b>: {props.Propietario}</p>
                                    <p><b>Padre:</b> {props.Padre}</p>
                                    <p><b>Madre:</b> {props.Madre}</p>
                                    <p><b>Info:</b> {props.Info}</p>

                                </td>
                            </tr>
                        </tbody>
                    </table>


                </ImageListItem>
            </Paper>

        </div>
    );
};

export default ItemTienda;
