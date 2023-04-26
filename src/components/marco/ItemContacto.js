import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import { eventoService } from '../../services/evento.service';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000 000 0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="S/ "
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};



const ItemContacto = (props) => {

    const history = useHistory();


    const grabarPujaDetalle = async (pCab_cCatalogo, pDvm_cNummov, pDvd_cDocID, pDvd_cNombres, pDvd_cApellidos, pDvd_cTelefono, pDvd_cCorreo, pDvd_nImporte) => {
        let _body = { Accion: "INSERTAR", Emp_cCodigo: "015", Pan_cAnio: "2023", Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo , Dvd_cDocID: pDvd_cDocID, 
        Dvd_cNombres: pDvd_cNombres , Dvd_cApellidos: pDvd_cApellidos , Dvd_cTelefono: pDvd_cTelefono ,
		Dvd_cCorreo: pDvd_cCorreo , Dvd_nImporte : pDvd_nImporte}


        return await eventoService.obtenerEventosDetPuja(_body).then(

            (res) => {

                setSubastasPuja(res[0])
            },
            (error) => {
                console.log(error);
            }
        );
    };


    const handleGrabarSubasta = () => {

        console.log("handleGrabarSubasta");
        console.log(outlined-documento.value);
        // grabarPujaDetalle(pCab_cCatalogo, pDvm_cNummov, outlined-documento.value, outlined-nombre.value, outlined-apellido.value, outlined-telefono.value, outlined-correo.value, outlined-puja.value);

    }

    const handleRegresarSubasta = () => {

        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/Subasta'

        });
    }

    const [values, setValues] = React.useState({
        textmask: '',
        numberformat: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <div align="left">
                <h2 >Contacto:</h2>
            </div>

            <Grid container spacing={2}>

                <Grid item xs={8}>


                    <TextField id="outlined-documento" label="Documento Id." variant="standard" />
                    <TextField id="outlined-nombre" label="Nombres" variant="standard" />
                    <TextField id="outlined-apellido" label="Apellidos" variant="standard" />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="formatted-text-mask-input">Teléfono</InputLabel>
                        <Input
                            value={values.textmask}
                            onChange={handleChange}
                            name="textmask"
                            id="outlined-telefono"
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl>
                    <TextField id="outlined-correo" label="Correo" variant="standard" />
                    <TextField
                        label="Valor de Puja"
                        value={values.numberformat}
                        onChange={handleChange}
                        name="numberformat"
                        id="outlined-puja"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        variant="standard"
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2}>

                <Grid item xs={8}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Button variant="contained" size="small" color="primary" onClick={handleGrabarSubasta}>Pujar</Button>
                                </td>
                                <td>
                                    <Button variant="contained" size="small" color="primary" onClick={handleRegresarSubasta}>Regresar</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </Grid>

            </Grid>
        </Box >


    );
};

export default ItemContacto;
