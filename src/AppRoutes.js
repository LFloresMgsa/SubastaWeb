import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Catalogo from './views/Catalogo';
import Videoteca from './views/Videoteca';
import Subasta from './views/Subasta';
import SubastaDetalle from './views/SubastaDetalle';
import Login from './views/Login';

import CompShowBlogs from './blog/ShowBlog';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';

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
        path="/subasta/detalle/:id"
        render={(route) => <SubastaDetalle {...props} {...route} />}
      />

      <Route
        path="/crear"
        render={(route) => <CompCreateBlog {...props} {...route} />}
      />

      <Route
        path="/editar"
        render={(route) => <CompEditBlog {...props} {...route} />}
      />

    </Switch>
  );

};

export default AppRoutes;
