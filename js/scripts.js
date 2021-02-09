var pokemonRepository = (function () {
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
    return {
        getAll : pokemonList,
        add : function (item) {
            if (typeof item === "object") {
                var passedObject = {};
                var keys = Object.keys(item);
                keys.forEach(function (key) {
                    switch (key) {
                        case "name" : if (item.name) {
                            passedObject.name = item.name;
                        }
                        break;
                        case "height" : if (item.height) {
                            passedObject.height = item.height;
                        }
                        break;
                        case "types" : if (item.types) {
                            passedObject.types = item.types;
                        }
                        break;
                    }
                });
                if (Object.keys(passedObject).length === 3) {
                    pokemonList.push(passedObject);
                }
           else {alert("missing or incorrect data!")}
        }
        else {
            alert("data not in object format!");
        }
    }
}
})();

pokemonRepository.add({
name : "blaziken",
height : 7,
types : ["fire" , "fighting"]
});

// iterates through all pokemon in the pokemonList array
pokemonRepository.getAll.forEach(function (item) {
     // writes the pokemon name and height to the dom using document.write
     document.write(item.name + " " + "height" + " " + ":" + " " + item.height + " ");
     // checks is pokemon height is greater than or equal to 2 and if it is, writes a custom message to the dom
     if (item.height >= 2) {document.write("wow thats big!" + "<br>")}
     // runs is the previous statement evaluates to false, and writes a custom message
     else {document.write("that pokemon is under 2 feet" + "<br>")}
})
    
