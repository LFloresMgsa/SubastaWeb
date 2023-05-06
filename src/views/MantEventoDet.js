import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaEventoDet from '../Mantenimientos/EventoDet/ListaEventoDet';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantEventoDet extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h1>Mantenimiento - Evento Detalle</h1>
                </div>

                <ListaEventoDet />      
            </div>
        );
    }
};

export default MantEventoDet;
