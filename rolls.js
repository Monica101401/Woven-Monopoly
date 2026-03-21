import { readFileSync } from 'fs'

// loads the dice rolls from the given file and returns them as an array
export function loadRolls(filename) {
  const data = readFileSync(new URL(`./data/${filename}`, import.meta.url))
  return JSON.parse(data)
}