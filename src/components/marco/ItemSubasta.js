import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from 'react-router-dom';


const Item = (props) => {
    const history = useHistory();

    const handleVerDetalle = () => {
        console.log("handleVerDetalle");
        history.push(`/gallo/${props.codigo}`)
    }

  return (
    <ImageListItem onClick={handleVerDetalle}>
        <img
            src={`${props.imagen}?w=248&fit=crop&auto=format`}
            srcSet={`${props.imagen}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={props.nombre}
            loading="lazy"
        />
        <ImageListItemBar 
            title={props.nombre}
            subtitle={`Codigo: ${props.codigo} , Precio: S/.${props.precio}`}
            actionicon={
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${props.info}`}
            >
                <InfoIcon />
            </IconButton>
            }
            //position="below"
        />
    </ImageListItem>
  );
};

export default Item;
