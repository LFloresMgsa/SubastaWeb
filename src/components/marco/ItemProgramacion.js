import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imagenes from '../../assets/images/imagenes';

const Itemprogramacion = (props) => {


    return (
        <div>
            <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Calendar" src={imagenes[0].img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.descripcion}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                  
                                </Typography>
                                {`Inicio : ${props.inicio} - Termino: ${props.fin}`}
                                
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

        </div>
    );
};

export default Itemprogramacion;
