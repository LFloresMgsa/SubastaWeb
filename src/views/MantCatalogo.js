import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaCatalogo from '../Mantenimientos/Catalogo/ListaCatalogo';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantCatalogo extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h1>Mantenimiento - Catalogo</h1>
                </div>

                <ListaCatalogo />
            </div>
        );
    }
};

export default MantCatalogo;
