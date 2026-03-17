import { readFileSync } from 'fs'

export function loadRolls(filename) {
  const data = readFileSync(new URL(`./${filename}`, import.meta.url))
  return JSON.parse(data)
}