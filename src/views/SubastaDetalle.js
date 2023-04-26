import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ItemDetalle from '../components/marco/ItemDetalle';
import ItemPuja from '../components/marco/ItemPuja';


const SubastaDetalle = () => {

    // const history = useHistory();
    // const location = useLocation();
    // const myObject = location.state.props;

    const pCab_cCatalogo = useParams().Cab_cCatalogo;
    const pDvm_cNummov = useParams().Dvm_cNummov;

    return (
        <div>
            <ItemDetalle pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}/>
            <ItemPuja />            
        </div>
    );
};

export default SubastaDetalle;


// rsc