import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';



const Item = (props) => {

    // const [gallo, setGallo] = React.useState('');

    // useEffect(() => {
    //     setGallo(props)   
    //       return () => {
            
    //       };
    //     }, []);

  return (
    <div>
        <ImageListItem >
            <img
                src={`${props.imagen}?w=248&fit=crop&auto=format`}
                srcSet={`${props.imagen}?w=248&fit=crop&auto=format&dpr=2 1x`}
                //alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={props.nombre}
                // subtitle={item.author}
                subtitle=""
                actionicon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${"XXX XXXX XXXX"}`}
                >
                    <InfoIcon />
                </IconButton>
                }
            />
            </ImageListItem>
    </div>
  );
};

export default Item;
