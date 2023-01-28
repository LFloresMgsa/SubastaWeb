import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Catalogo from './views/Catalogo';
import Videoteca from './views/Videoteca';
import Subasta from './views/Subasta';
import Login from './views/Login';

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
        path="/subasta"
        render={(route) => <Subasta {...props} {...route} />}
      />
        <Route
          path="/SubastaDetalle"
          render={(route) => <SubastaDetalle {...props} {...route} />}
        />
    </Switch>
  );

  // return accessToken.token ? (
  //   <Switch>
  //     <Route
  //       path="/dashboard"
  //       render={(route) => <Dashboard {...props} {...route} />}
  //     />
  //   </Switch>
  // ) : (
  //   !currentUser.detail && (
  //     <Switch>
  //       <Route
  //         path="/login"
  //         render={(route) => <Login {...props} {...route} />}
  //       />
  //     </Switch>
  //   )
  // );
};

export default AppRoutes;
