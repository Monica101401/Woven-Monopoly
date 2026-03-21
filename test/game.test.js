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
assert(calculateRent(space2, board2) === 2, 'rent doubles when owner has same colour property')

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

// test 9
// player must buy property if it is unowned
const buyerPlayer = { name: 'Peter', balance: 16, properties: [] }
const unownedSpace = { name: 'The Burvale', price: 1, colour: 'Brown', owner: null }

// simulate landing on unowned property
if (!unownedSpace.owner) {
  buyerPlayer.balance -= unownedSpace.price
  unownedSpace.owner = buyerPlayer
  buyerPlayer.properties.push(unownedSpace.name)
}

assert(unownedSpace.owner === buyerPlayer, 'player becomes owner after buying')
assert(buyerPlayer.balance === 15, 'balance reduced after buying unowned property')
assert(buyerPlayer.properties.includes('The Burvale'), 'property added to player properties list')

// test 10
// winner is the player with highest balance
const testPlayers = [
  { name: 'Peter', balance: 40 },
  { name: 'Billy', balance: 13 },
  { name: 'Charlotte', balance: -2 },
  { name: 'Sweedal', balance: 0 }
]
const winner = testPlayers.reduce((best, p) => p.balance > best.balance ? p : best)
assert(winner.name === 'Peter', 'winner is the player with highest balance')
assert(winner.balance === 40, 'winner has correct balance')

// test 11
// owner receives rent when player lands on their property
const rentOwner = { name: 'Peter', balance: 16 }
const rentPayer = { name: 'Billy', balance: 16 }
const rentSpace = { name: 'The Burvale', price: 1, colour: 'Brown', owner: rentOwner }
rentPayer.balance -= rentSpace.price
rentOwner.balance += rentSpace.price
assert(rentOwner.balance === 17, 'owner receives rent')
assert(rentPayer.balance === 15, 'payer balance reduced by rent')

// test 12
// player is not bankrupt when balance is exactly zero
const playerbal0 = { balance: 0 }
assert(isBankrupt(playerbal0) === false, 'player is not bankrupt when balance is zero')

// test 13
// player lands on their own property and nothing happens
const ownedByMe = { name: 'Peter', balance: 16 }
const myProperty = { name: 'The Burvale', price: 1, colour: 'Brown', owner: ownedByMe }
assert(myProperty.owner === ownedByMe, 'player owns this property no rent paid')

// test 14
// player goes bankrupt after buying expensive property
const lowBalPlayer = { name: 'Peter', balance: 1, properties: [] }
const expensiveProperty = { name: 'Massizim', price: 4, colour: 'Blue', owner: null }
lowBalPlayer.balance -= expensiveProperty.price
assert(isBankrupt(lowBalPlayer) === true, 'player goes bankrupt buying property they cannot afford')

// test 15
// player goes bankrupt after paying rent
const rentOwner2 = { name: 'Peter', balance: 16 }
const lowBalPlayer1 = { name: 'Billy', balance: 1 }
const expensiveRentSpace = { name: 'Massizim', price: 4, colour: 'Blue', owner: rentOwner2 }
lowBalPlayer1.balance -= expensiveRentSpace.price
rentOwner2.balance += expensiveRentSpace.price
assert(isBankrupt(lowBalPlayer1) === true, 'player goes bankrupt after paying rent they cannot afford')
assert(rentOwner2.balance === 20, 'owner still receives rent even if payer goes bankrupt')