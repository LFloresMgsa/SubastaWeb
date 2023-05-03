import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Catalogo from './views/Catalogo';
import Videoteca from './views/Videoteca';
import Subasta from './views/Subasta';
import SubastaDetalle from './views/SubastaDetalle';
import MantCatalogo from './views/MantCatalogo';

import Login from './views/Login';

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
        path="/Login"
        render={(route) => <Login {...props} {...route} />}
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
