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

    const location = useLocation();
    const myObject = location.state.props;

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
                    <TextField id="outlined-nombre" label="Nombres y Apellidos" variant="standard" />
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
                        <tr>
                            <th>
                                <Button variant="contained" size="small" color="primary"  onClick={handleRegresarSubasta}>Pujar</Button>
                            </th>
                            <th>
                                <Button variant="contained" size="small" color="primary"   onClick={handleRegresarSubasta}>Regresar</Button>
                            </th>
                        </tr>
                    </table>

                </Grid>

            </Grid>
        </Box >


    );
};

export default ItemContacto;
