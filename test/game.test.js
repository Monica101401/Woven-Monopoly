import { movePlayer, calculateRent, isBankrupt} from '../game.js'

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

// test 4
// player paying rent
const owner = { name: 'Peter', balance: 16 }
const space1 = { name: 'The Burvale', price: 1, colour: 'Brown', owner: owner }
const board1 = [
  { name: 'The Burvale', price: 1, colour: 'Brown', owner: owner },
  { name: 'Fast Kebabs', price: 1, colour: 'Brown', owner: null }
]
assert(calculateRent(space1, board1) === 1, 'normal rent equals property price')

// test 5
// rent doubles when owner has properties of same colour
const space2 = { name: 'The Burvale', price: 1, colour: 'Brown', owner: owner }
const board2 = [
  { name: 'The Burvale', price: 1, colour: 'Brown', owner: owner },
  { name: 'Fast Kebabs', price: 1, colour: 'Brown', owner: owner }
]
assert(calculateRent(space2, board2) === 2, 'rent doubles when owner has full colour group')

// test 6
// player is bankrupt when balance is below zero
const player4 = { balance: -1 }
assert(isBankrupt(player4) === true, 'player is bankrupt when balance is negative')

// test 7
// player buys a property and balance is reduced
const buyer = { name: 'Billy', balance: 16, properties: [] }
const property = { name: 'The Burvale', price: 1, colour: 'Brown', owner: null }
buyer.balance -= property.price
property.owner = buyer
assert(buyer.balance === 15, 'balance reduced after buying property')
assert(property.owner === buyer, 'player is set as owner after buying')

// test 8
// player collects $1 when passing GO
const player6 = { position: 7, balance: 16 }
const passedGo4 = movePlayer(player6, 4, 9)
if (passedGo4) player6.balance += 1
assert(player6.balance === 17, 'balance increases by $1 when passing GO')

