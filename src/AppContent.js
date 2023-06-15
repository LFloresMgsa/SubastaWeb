import React, { useState ,  useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

import AppRoutes from './AppRoutes';
import Menu from './components/layout/menu/Index';
import ComponentAlert from './components/common/others/ComponentAlert';
import { eventoService } from './services/evento.service';
import { storage } from "./storage.js";

const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const useStyles = makeStyles((theme) => ({
  root: ({ isUserLogged }) => ({


    display: isUserLogged ? 'flex' : 'block',
    '& .MuiAppBar-positionFixed': { zIndex: 1201 },

    '& .MuiAppBar-root': {
      padding: 0,
      paddingRight: '0 !important',

      '& .MuiToolbar-root': {
        '& .toolbar-left': {
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',

          '& div:first-child': {
            marginRight: '15px',
          },
        },
        '& .toolbar-right': {},
      },
    },

    '& .content': {
      width: '100%',
    },
  }),
}));





function AppContent(props) {
  const { accessToken, portalTabs, menuState, viewport } = props;
  const appAlerts = useSelector((state) => state.appAlerts);
  const classes = useStyles({
    // isUserLogged: accessToken.token ? true : false,
    isUserLogged: accessToken.token ? true : true,
  });

 //const [data, setData] = useState([]);  


  // Load de pagina
  // useEffect( () => {

  //   const listarAccesos = async () => {
  //     let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }

  //     return await eventoService.obtenerAccesosAuth(_body).then(
  //       (res) => {
  //         setData(res[0]);

  //       },
  //       (error) => {
  //         console.log(error);

  //       }
  //     );
  //   };

  //   listarAccesos();

  // }, [storage.GetStorage("Emp_cCodigo")]);


//dataMenu={data}

  return (
    <div className={classes.root}>
      <Menu
        viewport={viewport}
        state={menuState}
        global={props.global}
        tabs={portalTabs}
        
      />
      <main className="content">
        {appAlerts.length > 0 && <ComponentAlert menuState={menuState} />}
        <AppBarOffset />
        <AppRoutes {...props} />
      </main>
    </div>
  );
}

export default AppContent;
