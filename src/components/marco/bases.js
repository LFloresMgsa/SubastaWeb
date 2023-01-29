import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import imagenes from '../../assets/images/imagenes';



const Bases = () => {
    return (
        <div>
            <img alt="Bases" src={imagenes[2].img} />
         </div>
    );
};

export default Bases;