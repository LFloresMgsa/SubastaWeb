
import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { eventoService } from '../services/evento.service';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logeo, setLogeo] = useState('');

  const [error, setError] = useState('');


  const handleLogin = async () => {

    try {
      let _body = { Accion: "BUSCARREGISTRO", Sgm_cUsuario: username, Sgm_cContrasena: md5(password) }
      let _result;
      let _valor;
let _oResponse;


      await eventoService.obtenerUsuario(_body).then(

        (res) => {
          _oResponse = res
          setLogeo(res[0]);
          _result = res[0];


        },
        (error) => {
          console.log(error);
        }
      );


      _result.map((item) => (
        setLogeo(item.Sgm_cUsuario),
        _valor = item.Sgm_cUsuario

        
      ));

      

      if (_valor == username) {

        let objeto ;
        objeto=_result[0];

        cookies.set('Sgm_cUsuario', objeto.Sgm_cUsuario, {path:"/"});
        cookies.set('Sgm_cNombre', objeto.Sgm_cNombre, {path:"/"});
        cookies.set('Sgm_cContrasena', objeto.Sgm_cContrasena, {path:"/"});
        cookies.set('Sgm_cObservaciones', objeto.Sgm_cObservaciones, {path:"/"});


        alert(`Bienvenido ${objeto.Sgm_cNombre}`);
        setError('');

        window.location.href="./inicio";

      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while trying to login.');
    }
  };


  // Load de pagina
  useEffect(() => {

  }, []);

  return (


    <form className={classes.form} onSubmit={(e) => e.preventDefault()}>


      <Box sx={{ flexGrow: 1 }}>


        <Paper
          sx={{
            p: 2,
            margin: 1,
            maxWidth: 'auto',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >


          <TextField
            className={classes.input}
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Contraseña"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Ingresar
          </Button>
          {error && <p>{error}</p>}

        </Paper>
      </Box >

    </form>
  );
};

export default Login;