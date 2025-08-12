import _ from 'underscore';

/**
 * Esta funcion creaun nuevo deck
 * @param {Array<String>} tiposDeCarta    Ej: ['C', 'D', 'H', 'S']
 * @param {Array<String>} tiposEspeciales Ej: ['A','J','Q','K',]
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */

export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    if ( !tiposDeCarta || tiposDeCarta.length === 0 )  
         throw new Error ('tiposDeCarta es obligatorio como un arreglo de string');

    if ( !tiposDeCarta || tiposEspeciales.length === 0 )  
         throw new Error ('tiposEspeciales es obligatorio como un arreglo de string');



    let deck = [];

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposDeCarta) {
            deck.push(i + tipo);
        }
    }

    for (let esp of tiposEspeciales) {
        for (let tipo of tiposDeCarta) {
            deck.push(esp + tipo);
        }
    }

    return _.shuffle(deck);
};