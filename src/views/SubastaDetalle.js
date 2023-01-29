import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';


const SubastaDetalle = (props) => {

    const history = useHistory();

    const location = useLocation();
    const data = location.search && JSON.parse(location.search.split('=')[1]);



    const handleRegresarSubasta = () => {

        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/Subasta'

        });
    }

    return (
        <div>

            <div>
                <p>Codigo: {data.codigo}</p>
                
                <p><b>Precio Base:</b> S/. {props.precio}</p>
                <p><b>Placa:</b> {props.placa}</p>
                <p><b>Propietario</b>: {props.propietario}</p>
                <p><b>Padre:</b> {props.padre}</p>
                <p><b>Madre:</b> {props.madre}</p>
                <p><b>Info:</b> {props.info}</p>
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