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
    },
    addListItem : function (pokemon) {
        var unorderedList = document.querySelector(".pokemonList");
        var button = document.createElement("button");
        var listItem = document.createElement("li");
        unorderedList.appendChild(listItem);
        button.textContent = pokemon;
        button.classList.add("btn");
        listItem.appendChild(button);
        button.addEventListener("click" , function () {pokemonRepository.showDetails(pokemon)} , false);
    },
    showDetails : function (pokemon) {
        console.log(pokemon);
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
pokemonRepository.addListItem(item.name);

});
    
