import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaCatalogo from '../Mantenimientos/Catalogo/ListaCatalogo';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantEvento extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h1>Mantenimiento - MantVideoteca</h1>
                </div>

                
            </div>
        );
    }
};

export default MantEvento;
