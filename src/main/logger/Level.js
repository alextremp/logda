import {DEFAULT_LEVEL, LOCAL_STORAGE_LEVEL} from './constants'

class Level {
  constructor() {
    this._setActive(DEFAULT_LEVEL)
  }

  update(label) {
    this._setActive(label)
  }

  get id() {
    return this._activeLevel.id
  }

  get label() {
    return this._activeLevel.label
  }

  _setActive(label) {
    this._storedLevel = getStoredLevel()
    this._activeLevel = this._storedLevel || resolveLevel(label)
  }
}

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

const getStoredLevel = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedLevelLabel =
        window.localStorage && window.localStorage.getItem(LOCAL_STORAGE_LEVEL)
      return toLevel(storedLevelLabel)
    } catch (error) {}
  }
  return null
}

export {Level, LEVEL}
