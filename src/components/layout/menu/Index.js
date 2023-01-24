import React, { Fragment } from 'react';
import MenuItems from './MenuItems';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

import { Avatar, Chip, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';

const StyledMenu = styled(Drawer)(
  ({ theme, viewport, state }) => css`
    display: ${['expanded', 'icons'].includes(state.current)
      ? 'block'
      : 'none'};
    width: ${state.width};
    position: sticky;
    top: 50px;
    border-top: 0;

    .MuiPaper-root {
      border-top: 0;
      width: ${state.width};
      margin-top: ${['xs', 'sm'].includes(viewport) ? '0px' : '50px'};
      justify-content: space-between;
    }

    #menu-dev-info {
      text-align: center;
    }

    #logo-and-timer {
      height: 150px;

      .portalLogo {
        img {
          max-width: 200px;
          display: block;
          margin: auto;
        }
      }

      .appTimer {
        display: flex;
        justify-content: center;

        div:first-child {
          color: brown;
          font-weight: 600;
          padding-right: 10px;
        }
      }
    }
  `
);

// Menu states are "expanded  | icons | hidden"

const _temp_tabs = [
  {
    index: 1, // ***
    tabID: 1, // ***
    portalID: 9,
    tabName: 'Inicio', // ***
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;-1;',
    authorizedRolesAllString: 'Administrators,All Users',
    administratorRoles: '65;',
    tabOrder: 1,
    isVisible: false,
    componentName: '',
    routeName: 'inicio', // ***
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
  {
    index: 2,
    tabID: 2,
    portalID: 9,
    tabName: 'Catalogo',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: 'Administrators,Customer,Unauthenticated Users',
    administratorRoles: '65;',
    tabOrder: 2,
    isVisible: false,
    componentName: '',
    routeName: 'catalogo',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
  {
    index: 3,
    tabID: 3,
    portalID: 9,
    tabName: 'Videoteca',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: 'Administrators,Customer,Unauthenticated Users',
    administratorRoles: '65;',
    tabOrder: 3,
    isVisible: false,
    componentName: '',
    routeName: 'videoteca',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
];

const Menu = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { viewport, state, global } = props;
  const tabs = _temp_tabs;

  const sortMenuItems = tabs.sort((a, b) => (a.tabOrder > b.tabOrder ? 1 : -1));

  const drawerContent = (
    <Fragment>
      <div id="menu-tabs">
        <MenuItems
          viewport={viewport}
          menuState={state}
          items={sortMenuItems}
        />
      </div>
    </Fragment>
  );

  const container = !window ? () => window().document.body : undefined;

  return (
    <>
      <StyledMenu
        state={state}
        viewport={viewport}
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={state.current === 'expanded' ? true : false}
        onClose={() =>
          dispatch({
            type: 'SET_MENU_STATE',
            payload: 'hidden',
          })
        }
        ModalProps={{ keepMounted: true }}
        sx={{ display: { sm: 'block', md: 'none' } }}
      >
        {drawerContent}
      </StyledMenu>
      <StyledMenu
        state={state}
        viewport={viewport}
        variant="permanent"
        open={state.current === 'expanded' ? true : false}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </StyledMenu>
    </>
  );
};

export default Menu;
