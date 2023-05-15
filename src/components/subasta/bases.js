import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import imagenes from '../../assets/images/imagenes';
import Paper from '@mui/material/Paper';


const Bases = () => {
    return (
        <div >
            <Paper
                sx={{
                    p: 2,
                    margin: 1,
                    maxWidth: 'auto',
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                
            <img alt="Bases" src={imagenes[2].img} />
            </Paper>            
         </div>
    );
};

export default Bases;1