import { players, STARTING_BALANCE } from './players.js'
import { loadBoard } from './board.js'
import { loadRolls } from './rolls.js'

//prints the final scoreboard table after each game
function printResults(gameNumber, board) {
    //sort players by balance(highest to lowest)
  const sorted = [...players].sort((a, b) => b.balance - a.balance)
  const winner = sorted[0]

  console.log(`\n╔══════════════════════════════════════════════════╗`)
  console.log(`║           GAME ROUND ${gameNumber} - FINAL RESULTS                ║`)
  console.log(`╠══════════════════════════════════════════════════╣`)
  console.log(`║  WINNER: ${winner.name.padEnd(40)}║`)
  console.log(`╠══════════════════════════════════════════════════╣`)
  console.log(`║  PLAYER        BALANCE    POSITION               ║`)
  console.log(`╠══════════════════════════════════════════════════╣`)
  sorted.forEach(p => {
    //padEnd keeps columns aligned by padding with spaces
    const name = p.name.padEnd(14)
    const balance = `$${p.balance}`.padEnd(10)
    const position = board[p.position].name.padEnd(22)
    console.log(`║  ${name} ${balance} ${position} ║`)
  })
  console.log(`╚══════════════════════════════════════════════════╝`)
}

//resets the whole game by setting players to start 
function resetGame(board) {
    // resetting players balance, positiona and properties 
  players.forEach(p => {
    p.balance = STARTING_BALANCE
    p.position = 0
    p.properties = []
  })
  // clearing all property owners on the game board
  board.forEach(space => {
    if (space.type === 'property') space.owner = null
  })
}

// runs the roll and the game starts in this loop 
function playGame(gameNumber, rolls) {
  const board = loadBoard()
  let rollIndex = 0                // tracks the roll and simulates the game 
  let currentPlayerIndex = 0       // tracks players turn

  while (rollIndex < rolls.length) {
    const player = players[currentPlayerIndex]
    const roll = rolls[rollIndex++]  // next roll and advance the index

    //calculate new position of the player
    const newPos = (player.position + roll) % board.length

    //passed Go without landing on Go
    const passedGo = newPos !== 0 && (player.position + roll) >= board.length
    player.position = newPos

    // check if the player has passed Go
    if (passedGo) {
      player.balance += 1
      console.log(`${player.name} passed GO, collected $1`)
    }

    const space = board[player.position]
    console.log(`${player.name} rolled ${roll}, landed on ${space.name}`)

    if (space.type === 'property') {
      if (!space.owner) {
        // player must buy property if unowned
        player.balance -= space.price
        space.owner = player
        player.properties.push(space.name)
        console.log(`${player.name} bought ${space.name} for $${space.price}, balance $${player.balance}`)

        //check the balance of the player after buying
        if (player.balance < 0) break

      } else if (space.owner !== player) {
        // property is owned by other player pay rent
        //check if property owner has properties of same color
        const sameColour = board.filter(s => s.colour === space.colour)
        const monopoly = sameColour.every(s => s.owner === space.owner)
        const rent = monopoly ? space.price * 2 : space.price

        player.balance -= rent
        space.owner.balance += rent
        console.log(`${player.name} paid $${rent} rent to ${space.owner.name}, balance $${player.balance}`)

        //check if paying rent bankrupt the player
        if (player.balance < 0) break
      }
    }

    // move to next player
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length
  }

  // print final result after each round and reset for next round
  printResults(gameNumber, board)
  resetGame(board)
}

// run both games
const rolls1 = loadRolls('rolls_1.json')
const rolls2 = loadRolls('rolls_2.json')

//simulae both games
playGame(1, rolls1)
playGame(2, rolls2)