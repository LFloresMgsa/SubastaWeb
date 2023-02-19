const urlApi = 'http://localhost:5000/api/catalogo'

export const getAllCharacters = () =>{
    fetch(`${urlApi}`)
    .then((res)=> res.json())
    .then((data)=> data.results)
    .catch((error)=> console.log(error))
}