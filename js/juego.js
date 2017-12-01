// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

/* Estas dos variables son para guardar la posición
de la pieza vacía. Esta posición comienza siendo la [2, 2]*/
var posicionVacia = { fila:2,columna:2};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  return grillaOrdenada();
  
}

function grillaOrdenada(){
  var cantidadDeFilas = grilla.length;
  var cantidadDeColumnas = grilla [0].length;

  var ValorActual = 0;
  var ultimoValorVisto = 0;


  for (var fila = 0; fila< cantidadDeFilas;fila++) {
    for (var columna = 0; columna <cantidadDeColumnas; columna++) {
       ValorActual = grilla[fila] [columna]
      if(ValorActual <ultimoValorVisto) return false;
      
      ultimoValorVisto = ValorActual;
    }

  }
  return true;
}




// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("Ganaste");
}

// Intercambia posiciones grilla y en el DOM
/* Esta función puede ser pensada por partes, incluso separarse en dos funciones, para 
separar el manejo de posición de la grilla y, por otro lado, el manejo del DOM.

1) Lo primero que hay que pensar es como intercambiar dos posiciones en un arreglo de arreglos. 
Para que tengas en cuenta:
si queremos intercambiar las posiciones [1,2] con la [0, 0] 
si hacemos 
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con algo temporal?

2) Como segunda parte tenemos que pensar el intercambio en el dom.
Para eso, tenés que recordar todas las funciones aprendidas en los videos. 

getElementyById: para obtener los elementos que queremos intercambiar
parentNode: para obtener el padre de un elemento.
cloneNode: para clonar un elemento 
replaceChild(elem1, elem2): para reemplazar el elem1 por elem2

y recordar cómo es la estructura de árbol del DOM para entender como cada una de estas
funciones lo modifica. Esto lo podés ver en las clases
teóricas: https://www.acamica.com/cursos/254/javascript-manipulando-dom. 

*/
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var pieza1 = grilla[fila1] [columna1];
  var pieza2 = grilla[fila2] [columna2];
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  var elementoPieza1 = document.getElementById('pieza'+ pieza1);
  var elementoPieza2 = document.getElementById('pieza'+ pieza2);

  var padre =elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2,elementoPieza1);


}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;

}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);

}

/* Movimiento de fichas, en este caso la que se mueve 
es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: 
arriba, abajo, izquierda, derecha */
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna -1;


  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna +1;
  }

  /* Se chequea si la nueva posición es válida, si lo es, se intercambia. 
   Para que esta parte del código funcione correctamente deberás haber implementado 
   las funciones posicionValida, intercambiarPosiciones y actualizarPosicionVacia */
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



/* Las funciones que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */


/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en 
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora, 
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();  
        },500);
      } 
      evento.preventDefault();
    }
  })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();