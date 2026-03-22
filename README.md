# Woven Monopoly



## How to run the game

```bash

cd Woven-Monopoly-main

node index.js

```



## How to run the tests

```bash

cd Woven-Monopoly-main/test

node game.test.js

```



## Architecture decisions



### Player object

The player object was designed to grow dynamically.

Each player has a name, balance, position and properties list.

If more players need to be added in the future, they can simply

be added to the players array in players.js without changing

any game logic.



### Separate files

Each file has a single responsibility:

* `players.js` — player data and starting balance
* `board.js` — loads the board from board.json
* `rolls.js` — loads the dice rolls from the json files
* `game.js` — the main game logic
* `index.js` — entry point to run the game



### Data folder

All json files are kept in the data folder separate from the code.

The board and rolls can be changed without touching any code.



### Game logic

The game loop was built to cover all the rules:

* Players take turns in order using pre-set dice rolls
* Position wraps around the board using modulo
* Players collect $1 when passing GO but not when landing on it
* Players must buy unowned properties they land on
* Players pay rent to the owner when landing on owned properties
* Rent doubles when the owner has all properties of the same colour
* Game ends immediately when a player goes bankrupt
* Winner is the player with the highest balance



### Testing

Each core functionality was pulled out into its own exported

function so it could be tested independently without running

the entire game:

* `movePlayer` — tests position and passing GO
* `calculateRent` — tests normal rent and colour monopoly
* `isBankrupt` — tests bankruptcy conditions



### Dynamic board

The board is loaded from board.json so it can be changed

without touching any code. Position wrapping uses board.length

so it works for any board size.

