import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaEvento from '../components/mantenimientos/Evento/ListaEvento';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MantVideoteca extends Component {

    componentDidMount() {
        if (!cookies.get('Sgm_cUsuario')) {
            window.location.href = "./login";
        }
    };

    render() {
        return (
            <div >

                <div>
                    <h1>Mantenimiento - Eventos</h1>
                </div>

                <ListaEvento />      
            </div>
        );
    }
};

export default MantVideoteca;
