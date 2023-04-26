import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const eventoService = {
    obtenerEventosCab,
    obtenerEventosDet,
    obtenerEventosDetPuja,
    obtenerCatalogoDetImagenes
};


function obtenerEventosCab(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/vtm_evento`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDet(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/vtd_evento`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDetPuja(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/vtd_evento_puja`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogoDetImagenes(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/lgd_catalogo_imagenes`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

