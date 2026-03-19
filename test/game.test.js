import { movePlayer} from '../game.js'

// check if test passed or failed
function assert(condition, message) {
  if (condition) {
    console.log(`PASS: ${message}`)
  } else {
    console.log(`FAIL: ${message}`)
  }
}

// test 1
// player moves after dice rolls
const player1 = { position: 0, balance: 16 }
const passedGo1 = movePlayer(player1, 3, 9)
assert(player1.position === 3, 'player moves to correct position')
assert(passedGo1 === false, 'did not pass GO')

// test 2
// player wrapping around the board
const player2 = { position: 7, balance: 16 }
const passedGo2 = movePlayer(player2, 4, 9)
assert(player2.position === 2, 'player wraps around board')
assert(passedGo2 === true, 'passed GO when wrapping')

// test 3
// player landing on GO
const player3 = { position: 7, balance: 16 }
const passedGo3 = movePlayer(player3, 2, 9)
assert(player3.position === 0, 'player lands on GO')
assert(passedGo3 === false, 'landing on GO does not count as passing')