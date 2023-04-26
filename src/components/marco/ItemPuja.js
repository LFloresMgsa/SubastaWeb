import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

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
import { ForkLeft } from '@mui/icons-material';

import ItemContacto from './ItemContacto';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const ItemPuja = (props) => {

    const history = useHistory();

    const location = useLocation();
    /* const myObject = location.state.props; */

    return (
        <div>


                <table>
                    <tr>
                        <th>
                            <ItemContacto  pCab_cCatalogo={props.pCab_cCatalogo} pDvm_cNummov={props.pDvm_cNummov}/>
                        </th>
                        <th>
                            {/* <ItemPujaGrilla  pCab_cCatalogo={props.pCab_cCatalogo} pDvm_cNummov={props.pDvm_cNummov}/> */}
                        </th>
                    </tr>
                </table>

        
        </div>
    );
};

export default ItemPuja;
