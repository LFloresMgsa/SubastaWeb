import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';

import ItemDetalle from '../components/marco/ItemDetalle';
import ItemPuja from '../components/marco/ItemPuja';


const SubastaDetalle = () => {


    const pCab_cCatalogo = useParams().Cab_cCatalogo;
    const pDvm_cNummov = useParams().Dvm_cNummov;

    return (
        <div>
            <ItemDetalle pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}/>
            <ItemPuja pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}/>            
        </div>
    );
};

export default SubastaDetalle;
