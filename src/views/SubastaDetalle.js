import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const SubastaDetalle = (props) => {

    const location = useLocation();
    const data = location.search && JSON.parse(location.search.split('=')[1]);

    return (
        <div>
            {/* <GalloDetalle /> */}
            <div>
                <h2>Precio Base: {data.precio}</h2>
                <p>Codigo: {data.codigo}</p>
                <p>Name: {data.nombre}</p>
                
            </div>
            {/*   <PujeForm /> */}
        </div>
    );
};

export default SubastaDetalle;


// rsc