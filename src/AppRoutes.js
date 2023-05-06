import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Catalogo from './views/Catalogo';
import Videoteca from './views/Videoteca';
import Subasta from './views/Subasta';
import SubastaDetalle from './views/SubastaDetalle';
import MantCatalogo from './views/MantCatalogo';

import MantCatalogoImagenes from './views/MantCatalogoImagenes';
import MantVideoteca from './views/MantVideoteca';
import MantEvento from './views/MantEvento';
import MantEventoDet from './views/MantEventoDet';
import MantEventoPuja from './views/MantEventoPuja';


import Login from './views/Login';
import Logout from './views/Logout';

import ListaCatalogo from './Mantenimientos/Catalogo/ListaCatalogo';
import CreaCatalogo from './Mantenimientos/Catalogo/CreaCatalogo';
import EditaCatalogo from './Mantenimientos/Catalogo/EditaCatalogo';

const AppRoutes = (props) => {
  const { accessToken, currentUser } = props;

  return (
    <Switch>
      <Route
        path="/inicio"
        render={(route) => <Dashboard {...props} {...route} />}
      />
      <Route
        path="/catalogo"
        render={(route) => <Catalogo {...props} {...route} />}
      />
      <Route
        path="/videoteca"
        render={(route) => <Videoteca {...props} {...route} />}
      />
      <Route
        exact
        path="/subasta"
        render={(route) => <Subasta {...props} {...route} />}
      />

      <Route
        exact
        path="/MantCatalogo"
        render={(route) => <MantCatalogo {...props} {...route} />}
      />

      <Route
        exact
        path="/MantCatalogoImagenes"
        render={(route) => <MantCatalogoImagenes {...props} {...route} />}
      />

      <Route
        exact
        path="/MantVideoteca"
        render={(route) => <MantVideoteca {...props} {...route} />}
      />

      <Route
        exact
        path="/MantEvento"
        render={(route) => <MantEvento {...props} {...route} />}
      />

      <Route
        exact
        path="/MantEventoDet"
        render={(route) => <MantEventoDet {...props} {...route} />}
      />

      <Route
        exact
        path="/MantEventoPuja"
        render={(route) => <MantEventoPuja {...props} {...route} />}
      />




      <Route
        exact
        path="/Login"
        render={(route) => <Login {...props} {...route} />}
      />


      <Route
        exact
        path="/Logout"
        render={(route) => <Logout {...props} {...route} />}
      />

      <Route
        exact
        path="/subasta/detalle/:Cab_cCatalogo/:Dvm_cNummov/:IndicePanel"
        render={(route) => <SubastaDetalle {...props} {...route} />}
      />



      <Route
        path="/crear"
        render={(route) => <CreaCatalogo {...props} {...route} />}
      />

      <Route
        path="/editar/:Emp_cCodigo/:Cab_cCatalogo"
        render={(route) => <EditaCatalogo {...props} {...route} />}
      />

    </Switch>
  );

};

export default AppRoutes;
