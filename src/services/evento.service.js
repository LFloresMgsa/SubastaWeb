
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const eventoService = {
    obtenerEventosCab,
    obtenerEventosDet,
    obtenerEventosDetPuja,
    obtenerCatalogoDetImagenes,
    obtenerVideos,
    obtenerCatalogo,
    obtenerUsuario,
    obtenerToken,

    obtenerEventosCabAuth,
    obtenerEventosDetAuth,
    obtenerEventosDetPujaAuth,
    obtenerCatalogoDetImagenesAuth,
    obtenerVideosAuth,
    obtenerCatalogoAuth,

};

// SERVICIOS SIN AUTORIZACION

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

function obtenerCatalogo(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/lgm_catalogo_bs`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerVideos(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/lgm_videoteca`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerUsuario(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/sgm_usuarios`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerToken(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

// SERVICIOS CON AUTORIZACION

function obtenerEventosCabAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/vtm_evento/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDetAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/vtd_evento/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEventosDetPujaAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/vtd_evento_puja/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogoDetImagenesAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/lgd_catalogo_imagenes/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerCatalogoAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/lgm_catalogo_bs/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerVideosAuth(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = { }; 

  const url = `/api/evento/lgm_videoteca/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}
