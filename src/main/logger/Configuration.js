import {DEFAULT_LEVEL, GLOBAL_ITEM} from './constants'
import {resolveLevel} from './Level'

class Configuration {
  constructor() {
    this._context = typeof window === 'undefined' ? global : window
    this._context[GLOBAL_ITEM] = this._context[GLOBAL_ITEM] || {}
  }

  getLevel() {
    try {
      return resolveLevel(this._localLevel() || this._globalLevel())
    } catch (error) {
      return resolveLevel(DEFAULT_LEVEL)
    }
  }

  configureLevel({level} = {}) {
    this._context[GLOBAL_ITEM].level = resolveLevel(level).label.toLowerCase()
  }

  _globalLevel() {
    return this._context[GLOBAL_ITEM] && this._context[GLOBAL_ITEM].level
  }

  _localLevel() {
    try {
      return (
        this._context.localStorage &&
        this._context.localStorage.getItem(GLOBAL_ITEM + '.level')
      )
    } catch (error) {
      return undefined
    }
  }
}

const configuration = new Configuration()
export {configuration}
