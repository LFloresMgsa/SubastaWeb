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
import ItemCarousel from '../subasta/ItemCarousel';
import { eventoService } from '../../services/evento.service';
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

const ItemTienda = (props, {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {

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


    // const handleBuyProduct = (producto) => {
    //     history.push({
    //         pathname: `/agregaproductos`,
    //         //pathname: `/Subasta/detalle/${props.Cab_cCatalogo}/${props.Dvm_cNummov}/${props.IndicePanel}/${props.Per_cPeriodo}`,
    //         state: producto,
    //     });

    //     //history.push(`/Subasta/detalle/${props.Cab_cCatalogo}/${props.Dvm_cNummov}/${props.IndicePanel}/${props.Per_cPeriodo}`);
    //     //        history.push(`/tienda/productos/${props.Cab_cCatalogo}/${props.Cab_cDescripcion}`);
    // }

    return (
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
                <ImageListItem >

                    <table>

                        <tbody>
                            <tr>
                                <td>
                                    <ButtonBase sx={{ width: 300, height: 300 }}>
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
                                    <h3>
                                        <b>INFORMACION DEL EJEMPLAR</b>
                                    </h3>
                                    <p><b>Codigo:</b> S/. {props.Cab_cCatalogo}</p>
                                    <p><b>Nombre:</b> {props.Cab_cDescripcion}</p>
                                    <p><b>Precio:</b> S/. {props.Dvd_nImporte}</p>
                                    <p><b>Placa:</b> {props.Placa}</p>
                                    <p><b>Propietario</b>: {props.Propietario}</p>
                                    <p><b>Padre:</b> {props.Padre}</p>
                                    <p><b>Madre:</b> {props.Madre}</p>
                                    <p><b>Info:</b> {props.Info}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button variant="contained" size="small" color="primary" onClick={() => onAddProduct(props)}  >Agregar Carrito</Button>
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
