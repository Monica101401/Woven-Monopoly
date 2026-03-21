import { readFileSync } from 'fs'

// loads the board from board.json and returns it as an array
export function loadBoard() {
  const data = readFileSync(new URL('./data/board.json', import.meta.url))
  return JSON.parse(data)
}