
export const storage = {
    IniciaVariablesGlobales,
    SetStorage,
    GetStorage,
    GetStorageN,
    DelStorage
  };


 function IniciaVariablesGlobales() {

    SetStorage('Emp_cCodigo','015');
    SetStorage('Pan_cAnio','2023');  
    
    return true;
  }

  function SetStorage(pVariable, pValue) {

    localStorage.setItem(pVariable,pValue);
    
    return true;
  }
    
  function GetStorage(pVariable) {

    let nsVariable = localStorage.getItem(pVariable);
    
    return nsVariable;
  }

  function GetStorageN(pVariable) {

    let nsVariable = localStorage.getItem(pVariable);
    
    return nsVariable;
  }

  function DelStorage(pVariable) {

    localStorage.removeItem(pVariable);

    return true;
  }


  