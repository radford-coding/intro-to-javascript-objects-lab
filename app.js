const game = {
    party: [],
    gyms: [
      { location: "Pewter City", completed: false, difficulty: 1 },
      { location: "Cerulean City", completed: false, difficulty: 2 },
      { location: "Vermilion City", completed: false, difficulty: 3 },
      { location: "Celadon City", completed: false, difficulty: 4 },
      { location: "Fuchsia City", completed: false, difficulty: 5 },
      { location: "Saffron City", completed: false, difficulty: 6 },
      { location: "Cinnabar Island", completed: false, difficulty: 7 },
      { location: "Viridian City", completed: false, difficulty: 8 },
    ],
    items: [
      { name: "potion", quantity: 4 },
      { name: "pokeball", quantity: 8 },
      { name: "rare candy", quantity: 99 },
    ],
  }

// Exercise 1

// console.dir(pokemon, { maxArrayLength: null })
// use find() with p as the individual pokemon - can't use pokemon here since it's its own plural, and thus the name of our data object
console.log(pokemon.find(p => p.number === 59).name);

// Exercise 2

// console.log(game);


/*
Exercise 3
1. Add a new property to the `game` object. Let's call it "difficulty".
2. Choose a value for "difficulty" that you think fits the game. Ex: "Easy", "Med" or "Hard". How would you assign it?


Solve Exercise 3 here:
*/

game.difficulty = 'Med';

/*
Exercise 4
1. Select a starter Pokémon from the `pokemon` array. Remember, a starter Pokémon's `starter` property is true.
2. Add this Pokémon to the `game.party` array. Which array method will you use to add them?


Solve Exercise 4 here:
*/

// pick a starter pokemon from the given numbers
const firstPokemonNum = 25;
// array method: unshift()
game.party.unshift(pokemon.find(p => p.number === firstPokemonNum));


/*
Exercise 5
1. Choose three more Pokémon from the `pokemon` array and add them to your party.
2. Consider different attributes like 'type' or 'HP' for your selection. Which array method will you use to add them?


Solve Exercise 5 here:
*/

// get a pokemon with the most health,
let currentBeefiestPokemon = {
    hp: 0,
};
// a pokemon with the least health,
let currentSquishiestPokemon = {
    hp: 1000,
};
// and a pokemon of type psychic
let currentPsychicPokemon = {};
// go find em
for (p of pokemon) {
    if (p.hp > currentBeefiestPokemon.hp) {
        currentBeefiestPokemon = p;
    };
    if (p.hp < currentSquishiestPokemon.hp) {
        currentSquishiestPokemon = p;
    };
    if (p.type === 'psychic') { // this is inefficient perhaps?
        currentPsychicPokemon = p;
    };
};
game.party.push(currentBeefiestPokemon, currentSquishiestPokemon, currentPsychicPokemon);

console.log(game);

/*
Exercise 6
1. Set the `completed` property to true for gyms with a difficulty below 3.
2. Think about how you'd loop through the `gyms` array to check and update the `completed` property.


Solve Exercise 6 here:
*/

// ok apparently this is a big chunk of the exercises
// so now it's a function
// ! completeGyms(n): sets game.gyms 'completed' values to true for gym difficulties strictly less than n
function completeGyms(n) {
    for (gym of game.gyms) {
        if (gym.difficulty < n) {
            gym.completed = true;
        } else { // we can save some computations here since we know that the gyms are sorted by increasing difficulty
            break;
        };
    };
};
completeGyms(3);



/*
Exercise 7
1. Evolve the starter Pokémon you added to your party earlier. Each starter Pokémon evolves into a specific one.
2. How would you replace the current starter Pokémon in your party with its evolved form?

Hint: 
  - Pokemon 1: Bulbasaur evolves into Pokemon 2: Ivysaur
  - Pokemon 4: Charmander evolves into Pokemon 5: Charmeleon
  - Pokemon 7: Squirtle evolves into Pokemon 8: Wartortle
  - Pokemon 25: Pikachu evolves into Pokemon 26: Raichu

More Hints: The existing starter Pokemon will be *replaced* in your party with the Pokemon it evolved into. When working with an array of objects, the splice() array method is ideal for replacing one element with another. 


Solve Exercise 7 here:
*/

// most straightforward way, metagaming
// game.party[0] = pokemon[25];

// with fewer assumptions about order
let pikachuIndex = game.party.indexOf(game.party.find(p => p.name === 'Pikachu'));
let raichuIndex = pokemon.indexOf(pokemon.find(p => p.name === 'Raichu'));
game.party[pikachuIndex] = pokemon[raichuIndex];
// console.log(game);

/*
Exercise 8
1. Print the name of each Pokémon in your party.
2. Consider using a loop or an array method to access each Pokémon's name.

Solve Exercise 8 here:
*/

for (p of game.party) {
    console.log(p.name);
};

/*
Exercise 9
1. Can you print out all the starter Pokémon from the `pokemon` array?
2. Think about how you can identify a starter Pokémon and then log their names.


Solve Exercise 9 here:
*/

for (p of pokemon) {
    if (p.starter) { // since starter is t/f
        console.log(p); // prompt asked for the whole pokemon, not just their names
    };
};

/*
Exercise 10
Create a method called `catchPokemon` and add it to the `game` object. You should not need to edit the original game object directly. This method should:
  - Accept an object as a parameter called `pokemonObj`
  - Add the `pokemonObj` to the `game.party` array.
  - not return anything

After writing this method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.

Solve Exercise 10 here:
*/

game.catchPokemon = function(pokemonObj) {
    if (!game.party.includes(pokemonObj)) { // not entirely sure this is the right way
        game.party.push(pokemonObj); // plop it at the end
    } else { // error msg
        console.log(`party already includes ${pokemonObj.name}`)
    };
};
game.catchPokemon(pokemon[25]); // gives error
game.catchPokemon(pokemon[26]); // adds


/*
Exercise 11
1. Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify it so that it also decreases the number of pokeballs in your inventory each time you catch a Pokémon.
2. How will you find and update the quantity of pokeballs in the `game.items` array?

Tips:
For this exercise, it's okay to have a negative number of pokeballs.
After updating the method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.
Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 11 here:
*/
game.catchPokemon = function(pokemonObj) {
    if (!game.party.includes(pokemonObj)) { // not entirely sure this is the right way
        game.party.push(pokemonObj); // plop it at the end
        game.items[1].quantity -= 1;
    } else { // error msg
        console.log(`party already includes ${pokemonObj.name}`)
    };
};
game.catchPokemon(pokemon[133]); // I just chose a random number here
console.log(game.items[1]);

/*
Exercise 12
1. Similar to Exercise 6, now complete gyms with a difficulty below 6. How will you approach this?
 (change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 12 here:
*/

completeGyms(6);


/*
Exercise 13
1. Create a `gymStatus` method in `game` to tally completed and incomplete gyms.
2. How will you iterate through the `gyms` array and update the tally? Remember to log the final tally.

This method should:
  - Not accept any arguments.
  - Initially create a constant `gymTally`, which is an object that has two 
    properties: `completed` and `incomplete`, both of which are initially set to 0.
  - Iterate through the objects in the `game.gyms` array and update the 
    properties on `gymTally` as follows: 
    - `completed` should count how many gyms in the array have a value of `true` 
      for their `completed` property. 
    - `incomplete` should count how many gyms in the array have a value of 
      `false` for their `completed` property.
  - Log the value of `gymTally`.
  - The method should not return anything.

For example, if five gym objects have a value of `true` on their `completed` property and three gym objects have a value of `false` on their `completed` property, the logged value would be: `{ completed: 5, incomplete: 3 }`.

Solve Exercise 13 here:
*/

game.gymStatus = function () {
    // initialize
    const gymTally = {
        completed: 0,
        incomplete: 0,
    };
    // iterate
    for (gym of game.gyms) {
        if (gym.completed) { // true
            gymTally.completed++;
        } else if (!gym.completed) { // false
            gymTally.incomplete++;
        } else {
            console.log("this should not be printing!"); // to catch undefineds
        };
    };
    console.log(gymTally);
};

game.gymStatus();


/*
Exercise 14
1. Add a `partyCount` method to `game` that counts the number of Pokémon in your party.

This method should:
  - Not accept any arguments.
  - Count the number of Pokemon in the party.
  - return the found number of Pokemon in the party.

Solve Exercise 14 here:
*/

game.partyCount = function () {
    return game.party.length;
};
console.log(`There are ${game.partyCount()} pokemon in the party!`);


/*
Exercise 15
1. Now, complete gyms with a difficulty below 8. Reflect on how this is similar to or different from the previous gym exercises.
(change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 15 here:
*/

// the only reflection I can offer is that this is exercise at which I went back and refactored my code to make this code block a function. Hopefuly this pays off.

completeGyms(8);


/*
Exercise 16
1. Log the entire `game` object to the console. Take a moment to review the changes you've made throughout the exercises.


Solve Exercise 16 here:
*/

console.log(game);


/*
Exercise 17
1. Arrange the Pokémon in `game.party` by their HP. The one with the highest HP should come first.
2. You'll need to use the `.sort()` method. How does the compare function work in sorting numbers?


Solve Exercise 17 here:
*/

function hpCompare(a, b) {
    // assumes a and b are pokemon objects. not sure how to assert that in code.
    // using the code template from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    if (a.hp > b.hp) { // higher hp at the front
        return -1;
    } else if (a.hp < b.hp) { // lower hp at the back
        return 1;
    }
    // a must be equal to b
    return 0;
};
// somehow this sorts the hp in console.log calls at the top of the file. I do not understand.
game.party.sort(hpCompare);
console.log(game.party);

/*
Exercise 18
Add a new property to the `game` object called `collection` and initialize its value to an empty array.

Copy the `catchPokemon` method you wrote in Exercise Twelve and paste it below. Modify it so that:
  - Ensure that no more than six Pokemon can be in the party at any time. 
    Excess Pokemon should be placed in the `game.collection` array.
  - It's up to you how to distribute Pokemon in a situation where more than six 
    would be placed into the `game.party` array.

Again, for this exercise, it's okay to have a negative number of pokeballs.

After updating the method, use it by calling it and passing in a pokemon object of your choice from the `pokemon` data to catch it.

Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 18 here:
*/

console.log("I think y'all mean Exercise 11 here, not 12 which was completing gyms");
game.collection = [];
game.catchPokemon = function(pokemonObj) {
    if (!game.party.includes(pokemonObj) && game.party.length < 6) { // if it's unique and party has room
        game.party.push(pokemonObj); // plop it at the end
        game.items[1].quantity -= 1;
    } else if (!game.party.includes(pokemonObj) && !game.collection.includes(pokemonObj)) { // if it's unique but party is full
        game.collection.push(pokemonObj);
        game.items[1].quantity -= 1;
    } else { // error msg
        console.log(`You already have ${pokemonObj.name}`)
    };
};
game.catchPokemon(pokemon[12]); // I just chose a random number here
console.log(game.items[1]);


/*
Exercise 19
Copy the `catchPokemon` method that you just wrote above, and paste it below. The time has come to make it so that we cannot catch a Pokemon when we do not have any pokeballs to catch it with. 

Modify the method so that if there are no pokeballs a message will be displayed that there are not enough pokeballs to catch the desired Pokemon.

Also, ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 19 here:
*/

game.collection = [];
game.catchPokemon = function(pokemonObj) {
    if (game.items[1].quantity > 0) {
        if (!game.party.includes(pokemonObj) && game.party.length < 6) { // if it's unique and party has room
            game.party.push(pokemonObj); // plop it at the end
            game.items[1].quantity -= 1;
        } else if (!game.party.includes(pokemonObj) && !game.collection.includes(pokemonObj)) { // if it's unique but party is full
            game.collection.push(pokemonObj);
            game.items[1].quantity -= 1;
        } else { // error msg
            console.log(`You already have ${pokemonObj.name}`);
        };
    } else { // no pokemon for ju
        console.log("You're out of pokeballs!");
    };
};
game.catchPokemon(pokemon[142]); // I just chose a random number here
console.log(game.items[1]);


/*
Exercise 20
Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify is so that you can just pass in the name of a Pokemon instead of an entire object, and the method will look up the Pokemon from the data set for you.

The string passed in should be allowed to be any case (for example, if the string 'PiKacHU' is passed to the function, it should match to 'Pikachu' in the data set). 

If there is not a match, then return a string noting that the selected Pokemon does not exist. Ensure you do not decrement the pokeball count if an invalid Pokemon name is passed in, and also ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 20 here:
*/



/*
Exercise 21
Dynamically construct an object with the existing `pokemon` data sorted by the different pokemon types. The object will have this structure:

{
  grass: [
    { number: 1, name: 'Bulbasaur', type: 'grass', hp: 45, starter: true },
    { number: 2, name: 'Ivysaur', type: 'grass', hp: 60, starter: false },
    { number: 3, name: 'Venusaur', type: 'grass', hp: 80, starter: false },
    * more grass type Pokemon objects...
  ],
  fire: [
    { number: 4, name: 'Charmander', type: 'fire', hp: 39, starter: true },
    * more fire type Pokemon objects...
  ],
  water: [
    * water type Pokemon objects...
  ],
  * etc... until there is an array for every Pokemon type!
}

Log the object when it's constructed.

Solve Exercise 21 here:
*/



