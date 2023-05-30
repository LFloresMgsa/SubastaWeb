import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import imagenes from '../../assets/images/imagenes';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paragraph: {
        margin: theme.spacing(2),
    },
}));

const Bases = () => {
    const classes = useStyles();
    return (
        <div >
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

                <Typography variant="body1" className={classes.paragraph}>
                    <ol>
                        <li>La subasta iniciará el día martes 30 de mayo al mediodía y culminará el día jueves 1 de junio a las 8:00 pm, momento en el que se determinarán a los ganadores de los ejemplares subastados.</li>
                        <li>Cada puja se realizará por múltiplos de S/50.00 (cincuenta soles) sobre el precio base de cada ejemplar.</li>
                        <li>De existir 2 (dos) o más pujas por algún ejemplar a falta de 10 (diez) minutos para el cierre de la subasta, se aumentarán 10 (diez) minutos adicionales, generando una nueva hora de cierre, y así sucesivamente, hasta definir a un ganador.</li>
                        <li>Se eliminarán las pujas de quienes coloquen DNI y/o celular falsos o de otra persona. Toda puja se verificará por vía telefónica, por transparencia.</li>
                        <li>Nos comunicaremos, previo abono, con los ganadores para coordinar la recepción o envío de los ejemplares. El pago deberá realizarse dentro de las 24 (veinticuatro) horas posteriores a la finalización de la subasta.</li>
                        <li>Si el ganador de algún ejemplar no respondiera o no realizara el pago en el plazo indicado, se dará por nuevo ganador a quien realizó la siguiente puja más alta y así sucesivamente.</li>
                        <li>Los pagos serán realizados a la siguiente cuenta a nombre de Luis Enrique Torres Figueroa:</li>
                        <br />
                        <ul>
                            <li>- BCP soles: 193-17297396-0-15</li>
                            <li>- CCI: 002-193-117297396-0-1512</li>
                        </ul>
                        <br />
                        <li>Enviar el comprobante de pago al celular 950793210. De contar con otro medio de pago, se deberá coordinar previamente.</li>
                        <li>El ganador se encargará de todos los gastos de envío del ejemplar adjudicado y el plazo máximo para el recojo de las aves es de 7 (siete) días. No se entregarán animales sin la previa comprobación del pago e identidad de los ganadores.</li>
                        <li>Cualquier controversia que surgiera en la presente subasta será resuelta por la  organización."</li>
                    </ol>

                </Typography>

            </Paper>
        </div>
    );
};

export default Bases; 1