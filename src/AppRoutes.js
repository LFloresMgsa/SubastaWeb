import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Catalogo from './views/Catalogo';
import Videoteca from './views/Videoteca';
import Subasta from './views/Subasta';
import SubastaDetalle from './views/SubastaDetalle';
import Login from './views/Login';

import CompListaCatalogo from './catalogo/ListaCatalogo';
import CompCreaCatalogo from './catalogo/CreaCatalogo';
import CompEditaCatalogo from './catalogo/EditaCatalogo';

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

      {/* <Route
        path="/SubastaDetalle"
        render={(route) => <SubastaDetalle {...props} {...route} />}
      /> */}

      <Route
        exact
        path="/subasta/detalle/:Cab_cCatalogo/:Dvm_cNummov"
        render={(route) => <SubastaDetalle {...props} {...route} />}
      />

      <Route
        path="/crear"
        render={(route) => <CompCreaCatalogo {...props} {...route} />}
      />

      <Route
        path="/editar/:Emp_cCodigo/:Cab_cCatalogo"
        render={(route) => <CompEditaCatalogo {...props} {...route} />}
      />

    </Switch>
  );

};

export default AppRoutes;
