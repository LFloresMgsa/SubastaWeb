import React, { Fragment, useState, useEffect, Component } from 'react';
import ListaVideoteca from '../Mantenimientos/Videoteca/ListaVideoteca';
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
                    <h1>Mantenimiento - Videoteca</h1>
                </div>

 
                <ListaVideoteca />                  
            </div>
        );
    }
};

export default MantEvento;
