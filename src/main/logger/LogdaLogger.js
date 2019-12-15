import {LEVEL} from './Level'
import {EMPTY, SEPARATOR} from './constants'

class LogdaLogger {
  constructor({tags = [], level} = {}) {
    this._children = new Map()
    this._tags = tags
    this._label = this._createLabel()
    this._level = level
    this._console = console
  }

  _createLabel() {
    const tagsLabel = this._tags.join(SEPARATOR)
    return tagsLabel.length > 0 ? `${tagsLabel}>` : EMPTY
  }

  logger(tag) {
    const child = new LogdaLogger({
      tags: [...this._tags, tag],
      level: this._level
    })
    this._children.set(tag, child)
    return child
  }

  get level() {
    return this._level.label
  }

  trace(provider) {
    this._level.id < LEVEL.debug.id &&
      this._log(LEVEL.trace.label, this._console.trace, provider)
  }

  debug(provider) {
    this._level.id < LEVEL.info.id &&
      this._log(LEVEL.debug.label, this._console.log, provider)
  }

  info(provider) {
    this._level.id < LEVEL.warn.id &&
      this._log(LEVEL.info.label, this._console.info, provider)
  }

  warn(provider) {
    this._level.id < LEVEL.error.id &&
      this._log(LEVEL.warn.label, this._console.warn, provider)
  }

  error(provider) {
    this._level.id < LEVEL.off.id &&
      this._log(LEVEL.error.label, this._console.error, provider)
  }

  _log(level, writter, provider) {
    try {
      const label = `[${level}]>${this._label}`
      const args = provider()
      if (Array.isArray(args)) writter(label, ...args)
      else writter(label, args)
    } catch (error) {
      this.warn(() => ['Logging error:', provider, error])
    }
  }
}

export {LogdaLogger}
