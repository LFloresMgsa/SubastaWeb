import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import ItemCarousel from './ItemCarouselTienda';

import { eventoService } from '../../services/evento.service';


import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imagenes from '../../assets/images/imagenes';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

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



const ItemProgramacionTienda = (
    { alltiendas,
        allProducts,
        setAllProducts,
        countProducts,
        setCountProducts,
        total,
        setTotal }

) => {

    //const history = useHistory();
    const [tienda, setTienda] = React.useState([]);

    const [imagenesSlide, setImagenesSlide] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const onAddProduct = product => {
        if (allProducts.find(item => item.Cab_cCatalogo === product.Cab_cCatalogo)) {
            const products = allProducts.map(item =>
                item.Cab_cCatalogo === product.Cab_cCatalogo
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.Dvd_nImporte * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }

        setTotal(total + product.Dvd_nImporte * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };

    const obtenerSubastaSlider = async (pCab_cCatalogo) => {
        return await obtenerImagenes(pCab_cCatalogo).then(
            (res) => {

                setImagenesSlide(res)
                handleOpen()
            },
            (error) => {
                console.log(error);
            }
        );
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

    const obtenerTiendaDetalle = async (pDvm_cNummov) => {
        let _body = { Accion: "EVENTO_DET", Emp_cCodigo: "015", Pan_cAnio: "2023", Dvm_cNummov: pDvm_cNummov }


        return await eventoService.obtenerEventosDet(_body).then(

            (res) => {

                setTienda(res[0]);
                //setAllProducts(res[0]);
            },
            (error) => {
                console.log(error);
            }
        );
    };


    useEffect(() => {
        obtenerTiendaDetalle(alltiendas.Dvm_cNummov);

    }, []);

    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Calendar" src={imagenes[0].img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={alltiendas.Dvm_cDescripcion}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >

                                </Typography>
                                {`Inicio : ${alltiendas.Dvm_dInicio} - Termino: ${alltiendas.Dvm_dFin}`}

                            </React.Fragment>
                        }
                    />
                </ListItem>

            </List>

            <ImageList cols={3} >
                {tienda.map((item) => (
                    <div>
                        <Paper
                            sx={{
                                p: 1,
                                margin: 0.5,
                                maxWidth: 'auto',
                                width: 350,
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <ImageListItem key={item.cab_cenlace}>

                                <table>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <ButtonBase sx={{ width: 300, height: 300 }}>
                                                    <Img alt="complex" src={item.cab_cenlace} onClick={() => obtenerSubastaSlider(item.Cab_cCatalogo)}   />
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
                                                <h3>
                                                    <b>INFORMACION DEL EJEMPLAR</b>
                                                </h3>
                                                <p><b>Codigo:</b> S/. {item.Cab_cCatalogo}</p>
                                                <p><b>Nombre:</b> {item.Cab_cDescripcion}</p>
                                                <p><b>Precio:</b> S/. {item.Dvd_nImporte}</p>
                                                <p><b>Placa:</b> {item.Placa}</p>
                                                <p><b>Propietario</b>: {item.Propietario}</p>
                                                <p><b>Padre:</b> {item.Padre}</p>
                                                <p><b>Madre:</b> {item.Madre}</p>
                                                <p><b>Info:</b> {item.Info}</p>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="small" color="primary" onClick={() => onAddProduct(item)}  >Agregar Carrito</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                            </ImageListItem>
                        </Paper>

                    </div>
                ))}

            </ImageList>


        </div>
    );
};

export default ItemProgramacionTienda;
