import { playGame } from './game.js'
import { loadRolls } from './rolls.js'

// run both games
const rolls1 = loadRolls('rolls_1.json')
const rolls2 = loadRolls('rolls_2.json')

//simulae both games
playGame(1, rolls1)
playGame(2, rolls2)