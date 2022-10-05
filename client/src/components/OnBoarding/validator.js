export const validator = (type, fieldName) => {
  switch (type) {
    case "required": {
      return "El campo es requerido";
    }
    case "minLength": {
      return "Minimo cuatro caracteres";
    }
    case "maxLength": {
      return "Maximo quince caracteres"
    }
    case "pattern": {
      if(fieldName === "email") {
        return "Ingrese un email valido"
      }
      if(fieldName === "pass") {
        return "Debe contener letras, numeros y almenos ocho caracteres"
      }
    }
    default:
      break;
  }
};