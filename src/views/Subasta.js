import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { videotecaService } from '../services/videoteca.service';
import Item from '../components/gallos/Item';
import Programacion from '../components/gallos/Programacion';

const SubastaStyled = styled('div')(
  ({ theme }) => css`
    h1 {
      color:black;
    }
     `
);



const Subasta = (props) => {
  const [gallos, setGallos] = React.useState([]);

  const obtenerGallos = async () => {
    return await videotecaService.obtenerGAllos().then(
      (res) => {
        console.log(res)
        setGallos(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };
  
 useEffect(() => {
  obtenerGallos();
    return () => {
      
    };
  }, []);

  return (
    <SubastaStyled>
      <h1>Bienvenido a la Subasta</h1>
      <Programacion />
      <ImageList sx={{ width: 500, height: 450 }} >
        {gallos.map((gallo) => (
          <Item key={gallo.id} {...gallo} />
        ))}
      </ImageList>
    </SubastaStyled>
  );
};

export default Subasta;

