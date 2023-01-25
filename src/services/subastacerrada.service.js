import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const subastacerradaService = {
  obtenerSubastacerrada,
};


function obtenerSubastacerrada() {
  let subastacerradaArray = [
    {id:1,inicio: "11/01/2023", fin:"13/01/2023",descripcion:"Segunda semana de enero"},
    {id:2,inicio: "18/01/2023", fin:"20/01/2023",descripcion:"Tercera semana de enero"},
  ]

  const subastacerrada= Promise.resolve(subastacerradaArray );
  return subastacerrada;
}



