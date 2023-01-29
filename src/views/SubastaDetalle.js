import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';


const SubastaDetalle = (props) => {

    const location = useLocation();
    const data = location.search && JSON.parse(location.search.split('=')[1]);

    const history = useHistory();

    const handleRegresarSubasta = () => {

        const data = { codigo: `${props.codigo}` };

        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/Subasta'
       /*      search: `?data=${JSON.stringify(data)}` */
        });
    }

    return (
        <div>

            <div>
                <h2>Precio Base: {data.precio}</h2>
                <p>Codigo: {data.codigo}</p>
                <p>Name: {data.nombre}</p>

            </div>
            {/*   <PujeForm /> */}

            <div>
                <Button onClick={handleRegresarSubasta}>Regresar</Button>
            </div>

        </div>


    );
};

export default SubastaDetalle;


// rsc