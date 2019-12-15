import {LogdaLogger} from './logger/LogdaLogger'
import {DEFAULT_LEVEL, GLOBAL_ITEM} from './logger/constants'
import {resolveLevel} from './logger/Level'

const getStoredLevel = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedLevelLabel =
        window.localStorage &&
        window.localStorage.getItem(GLOBAL_ITEM + '.level')
      return storedLevelLabel
    } catch (error) {}
  }
}

let defaultLevel = resolveLevel(DEFAULT_LEVEL)
const setLogdaLevel = level => (defaultLevel = resolveLevel(level))

const logdaFactory = storedLevel => tag => {
  return new LogdaLogger({
    tags: [tag],
    level: (storedLevel && resolveLevel(storedLevel)) || defaultLevel
  })
}
const logda = logdaFactory(getStoredLevel())

export {logda, setLogdaLevel}
