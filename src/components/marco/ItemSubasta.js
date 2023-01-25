import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';



const Item = (props) => {



  return (
    <div>
        <ImageListItem >
            <img
                src={`${props.imagen}?w=248&fit=crop&auto=format`}
                srcSet={`${props.imagen}?w=248&fit=crop&auto=format&dpr=2 2x`}
                //alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={props.nombre}
                // subtitle={item.author}
                subtitle={`Codigo: ${props.codigo} , Precio: S/.${props.precio}`}
                actionicon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${"Mi Gallo Preferido"}`}
                >
                    <InfoIcon />
                </IconButton>
                }
                position="below"
            />
            </ImageListItem>
    </div>
  );
};

export default Item;
