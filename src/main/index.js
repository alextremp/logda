import {LogdaLogger} from './logger/LogdaLogger'
import {DEFAULT_LEVEL, LOCAL_STORAGE_LEVEL} from './logger/constants'
import {LEVEL, resolveLevel} from './logger/Level'

const getStoredLevelLabel = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedLevelLabel =
        window.localStorage && window.localStorage.getItem(LOCAL_STORAGE_LEVEL)
      return storedLevelLabel
    } catch (error) {}
  }
}

let logdaLevel
let storedLevelLabel = getStoredLevelLabel()
let defaultLevel = resolveLevel(DEFAULT_LEVEL)

const updateLogdaLevel = () => {
  storedLevelLabel = getStoredLevelLabel()
  logdaLevel =
    (storedLevelLabel &&
      LEVEL[storedLevelLabel] &&
      resolveLevel(storedLevelLabel)) ||
    defaultLevel
}

const setLogdaLevel = level => {
  defaultLevel = resolveLevel(level)
  updateLogdaLevel()
}

const logdaFactory = () => tag => {
  return new LogdaLogger({
    tags: [tag],
    level: logdaLevel
  })
}

updateLogdaLevel()
const logda = logdaFactory()
export {logda, setLogdaLevel}
