class LogdaLogger {
  constructor({console, level = LEVEL.off, tag} = {}) {
    this._console = console
    this._level = level
    this._label = tag ? ` ${tag} |` : ''
  }

  trace(provider) {
    this._level.id < LEVEL.debug.id && this._log(this._console.trace, provider)
  }

  debug(provider) {
    this._level.id < LEVEL.info.id && this._log(this._console.log, provider)
  }

  info(provider) {
    this._level.id < LEVEL.warn.id && this._log(this._console.info, provider)
  }

  warn(provider) {
    this._level.id < LEVEL.error.id && this._log(this._console.warn, provider)
  }

  error(provider) {
    this._level.id < LEVEL.off.id && this._log(this._console.error, provider)
  }

  _log(writter, provider) {
    try {
      const args = provider()
      writter(`[${this._level.label}]${this._label}`, ...args)
    } catch (e) {}
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

export {LogdaLogger, LEVEL}
