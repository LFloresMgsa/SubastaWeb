import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import ItemDetalleModal from './ItemDetalleModal';
import ItemDetallePujar from './ItemDetallePujar';

const Item = (props) => {


    return (
        <ImageListItem >
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
                position="below"

            />
            <table>
                <tr>
                    <th><ItemDetalleModal /></th>
                    <th><ItemDetallePujar /></th>
                </tr>
            </table>
        </ImageListItem>
    );
};

export default Item;
