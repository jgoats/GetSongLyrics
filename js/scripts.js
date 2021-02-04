// list of pokemon
var pokemonList = [
    {
        name : "charmander",
        height : 2,
        types : ["fire"]
    },
    {
        name : "snorlax",
        height : 6.11,
        type : ["normal"]
    },
    {
        name : "combusken",
        height : 2.11,
        types : ["fire" , "fighting"]
    },
    {
        name : "torkoal",
        height : 1.8,
        types : ["fire"]
    }

];
// iterates through all pokemon in the pokemonList array
for (i = 0; i < pokemonList.length; i++) {
    // writes the pokemon name and height to the dom using document.write
    document.write(pokemonList[i].name + " " + "height" + " " + ":" + " " + pokemonList[i].height + " ");
    // checks is pokemon height is greater than or equal to 2 and if it is, writes a custom message to the dom
    if (pokemonList[i].height >= 2) {document.write("wow thats big!" + "<br>")}
    // runs is the previous statement evaluates to false, and writes a custom message
    else {document.write("that pokemon is under 2 feet" + "<br>")}
    
}