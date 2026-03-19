import { readFileSync } from 'fs'

export function loadBoard() {
  const data = readFileSync(new URL('./data/board.json', import.meta.url))
  return JSON.parse(data)
}