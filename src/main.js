"use strict";

let doc = "12345678"; //ES FUNDAMENTAL PONER UN toLowerCase() en la entrada del formulario.

// VERIFICANDO LA VALIDACIÓN DEL DOCUMENTO
// a) Creando variables útiles para la validación

// Cantidad de caracteres del documento insertado
let lengthDoc = doc.length;
console.log("lengthDoc", lengthDoc);

// Caracteres que son válidos como primer dígito de un NIE:
const nieValidChars = ["x", "y", "z"];
console.log("caracteres válidos para el NIE", nieValidChars);

// Con "doc.slice(1) excluímos el primer caracter del documento insertado para poder hacer validaciones."
const docNoFirstDigit = doc.slice(1);
console.log("Documento sin el primer dígito", docNoFirstDigit);

// Con "chartAt()" sacamos el primer caracter del documento insertado y nos garantizamos que estén en minúsculas con toLoweCase(). Lo guardamos en "firstDigitControl"
const firstDigitControl = doc.charAt(0).toLowerCase();
console.log("Primer dígito", firstDigitControl);

// Esas tres constantes que acabamos de crear también nos servirá para más adelante, para hacer operaciones con el NIE.

// #################################################

// b) VERIFICANDO QUE LOS CARACTERES INSERTADOS SEAN VALIDOS
if (
  lengthDoc < 8 || //longitud mayor que 8 caracteres O
  isNaN(docNoFirstDigit) || //que sean números (excluído el primer dígito)
  (isNaN(firstDigitControl) && !nieValidChars.includes(firstDigitControl)) //que el primer dígito no sea un número y no esté incluído en las letras permitidas
) {
  // MIRAR EL TEMA DE PONER UN TRY CATCH QUE RECOJA TODOS LOS ERRORES POSIBLES
  console.error(
    "No has insertado un documento válido. El documento tiene que tener 8 caracteres en total. El primer caracter tiene que ser un número o algunas de las siguientes letras:  x, y, z (es indiferente si son mayúsculas o minúsculas). Los demás caracteres tienen que ser números."
  );
}

//#########################################################################

// DEFINIENDO EL TIPO DE DOCUMENTO Y CAMBIANDO LAS LETRAS DEL NIE A NUMEROS
let docType;

// Comprobamos si el primer digito no es un NaN. Si es así, se trata de un DNI y ya seguimos adelante en calcular la letra.
// Si el primer dígito es un NaN entonces se trata de un NIE y antes de proseguir tenemos que cambiar la letra por su valor numérico correpondente para poder hacer los cálculos.

if (!isNaN(firstDigitControl)) {
  docType = "DNI";
} else {
  docType = "NIE";

  // Sacamos el valor númerico del index del array de letras permitidas (el valor será la posición del array de letras que corresponda al primer dígito). lo guardamos en una constante.
  const replacementDigit = nieValidChars.indexOf(firstDigitControl);

  //Juntamos el valor numérico que acabamos de sacar con los demás 7 dígitos del NIE:
  doc = replacementDigit + docNoFirstDigit;
}
console.log("número del documento para el cálculo:", doc);
console.log("docType:", docType);

//#########################################################################

//CALCULAMOS LA LETRA DEL DOCUMENTO

// array de equivalencia entre números y letras

const NumberLetterMapping = [
  "T",
  "R",
  "W",
  "A",
  "G",
  "M",
  "Y",
  "F",
  "P",
  "D",
  "X",
  "B",
  "N",
  "J",
  "Z",
  "S",
  "Q",
  "V",
  "H",
  "L",
  "C",
  "K",
  "E",
];

//Calculamos el valor numérico que corresponde a la letra del documento, con el algorítmo del Ministerio del Interior
const numericLetterValue = doc % 23;

console.log(
  "valor numérico que corresponde a la letra del DNI",
  numericLetterValue
);

//La letra del documento que queremos saber está en la posición correspondente al valor numérico calculado

const dniLetter = NumberLetterMapping[numericLetterValue];

console.log(
  `La letra que corresponde al ${docType} insertado es la "${dniLetter}"`
);
