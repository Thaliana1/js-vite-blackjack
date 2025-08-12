import _ from 'underscore';

import { crearDeck } from './usecases/crear-deck';
import { pedirCarta } from './usecases/pedir-carta';
import { valorCarta } from './usecases/valor-carta';

const miModulo = (() => {
    'use strict'
    

// creacion de baraja de cartas
// Esta funcion crea un nuevo  deck o baraja
//Inicializaciones
 let   deck         = [];
 const tipos      = ['C', 'D', 'H', 'S'],
       especiales = ['A','J','Q','K',];


  let puntosJugadores = [];


//Referencias de HTML
 const btnNuevo   = document.querySelector('#btnNuevo'),
       btnPedir   = document.querySelector('#btnPedir'),
       btnDetener = document.querySelector('#btnDetener');

 const divCartasJugadores = document.querySelectorAll('.divCartas'),
       puntosHTML         = document.querySelectorAll('small'); //smalls





//creamos un m0odulo
deck = crearDeck( tipos , especiales );


        
// Esta funcion inicializa el juego
const inicializarJuego  = ( numJugadores = 2 ) => {
     deck = crearDeck( tipos, especiales );

    puntosJugadores = [];  //reinicializarlo
    for ( let i = 0; i < numJugadores; i++ ) {
        puntosJugadores.push(0); //reinicializarlo
    }
    puntosHTML.forEach ( elem => elem.innerText = 0); //ejecuta el coba que hay adentro del parentesis 
    divCartasJugadores.forEach ( elem => elem.innerHTML = '');

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

}



// acumular los putnos del jugador respectivo
//Turno: 0 = primer jugador y el ultimo sera la computadora
   const acumularPuntosJugador = (carta, turno) => {
     puntosJugadores[turno] = puntosJugadores[turno] + valorCarta ( carta);
     puntosHTML[turno].innerText = puntosJugadores[turno]; 
     return puntosJugadores[turno];

}

const crearCarta = ( carta, turno) => {

    const imgCarta = document.createElement('img');
    imgCarta.src = `/cartas/${ carta }.png`; //cualquier carta
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append ( imgCarta );
}

//funcion para evaluar quien gana
const determinarGanador = () => {

    const [ puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana 🥺');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana 😐');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana 😅');
        } else {
            alert('Computadora gana 😐');
        }
    }, 500);

}

// Turno de la Computadora 
const turnoComputadora = (puntosMinimos) => {

     let puntosComputadora = 0;

    do {
        const carta = pedirCarta( deck );
        puntosComputadora = acumularPuntosJugador(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)  );

    //funcion para evaluar quien gana
    determinarGanador();
    
}


// EVENTOS 
btnPedir.addEventListener('click', () => {  //cuando se haga click en ese boton se dispara la accion que se va definir

    const carta = pedirCarta( deck );
    const puntosJugador = acumularPuntosJugador(carta, 0 );

    crearCarta( carta, 0 );
     

 //Controlar puntos +21 perdio 
   if( puntosJugador > 21) {
         console.warn('Lo siento mucho, perdiste');
         btnPedir.disabled = true;
         btnDetener.disabled = true;
         turnoComputadora (puntosJugador); //cuando supera los 21
        return;

    } else if ( puntosJugador === 21){
         console.warn('21,Ganaste!');
         btnPedir.disabled = true;
         btnDetener.disabled = true;
         turnoComputadora(puntosJugador);
         return;
    }

}); 

//Detener el boton
btnDetener.addEventListener('click', () =>{
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora ( puntosJugadores);
});

//Borrar todo 
btnNuevo.addEventListener('click', () =>{

    deck = [];
    deck = crearDeck ( tipos, especiales);

    //console.clear(); //limpia la consola
    inicializarJuego();

 });

 //siempre tiene que tener esto
  return {
     nuevoJuego : inicializarJuego
  };

})();



