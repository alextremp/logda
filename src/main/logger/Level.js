import {DEFAULT_LEVEL} from './constants'

const makeLevel = (id, label) => ({id, label})

const LEVEL = {
  trace: makeLevel(1, 'TRACE'),
  debug: makeLevel(2, 'DEBUG'),
  info: makeLevel(3, 'INFO'),
  warn: makeLevel(4, 'WARN'),
  error: makeLevel(6, 'ERROR'),
  off: makeLevel(7, 'OFF')
}

const resolveLevel = input => toLevel(input) || LEVEL[DEFAULT_LEVEL]

const toLevel = input => LEVEL[input]

export {LEVEL, resolveLevel}
