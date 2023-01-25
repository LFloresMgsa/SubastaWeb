import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';



const StyledView = styled('div')(
    ({ theme }) => css`
      overflow-y: hidden;
       `
  );

const Programacion = (props) => {

    // const [gallo, setGallo] = React.useState('');

    // useEffect(() => {
    //     setGallo(props)
    //       return () => {
            
    //       };
    //     }, []);

  return (
    <div>
       <p>inicio: VIERNES 20 de ENERO del 2023</p>
       <p>termino: DOMINGO 22 de ENERO del 2023 a las 8:00 pm </p>
    </div>
  );
};

export default Programacion;
