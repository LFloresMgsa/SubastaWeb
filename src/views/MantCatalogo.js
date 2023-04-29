import React, { Fragment, useState, useEffect } from 'react';
import ListaCatalogo from '../Mantenimientos/Catalogo/ListaCatalogo';

const MantCatalogo = () => {


    return (
        <div >

            <div>
                <h1>Mantenimiento - Catalogo</h1>
            </div>

            <ListaCatalogo />
        </div>
    );
};

export default MantCatalogo;
