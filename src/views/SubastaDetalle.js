import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';

import ItemDetalle from '../components/marco/ItemDetalle';
import ItemPuja from '../components/marco/ItemPuja';


const SubastaDetalle = (props) => {


    const pCab_cCatalogo = useParams().Cab_cCatalogo;
    const pDvm_cNummov = useParams().Dvm_cNummov;
    const pIndicePanel = useParams().IndicePanel;
    

    return (
        <div>
            <ItemDetalle pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}/>
            <ItemPuja pCab_cCatalogo={pCab_cCatalogo} pDvm_cNummov={pDvm_cNummov}  pEventoActual={props.pEventoActual} pIndicePanel={pIndicePanel}/>            
        </div>
    );
};

export default SubastaDetalle;
