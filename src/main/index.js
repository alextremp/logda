import {LogdaLogger} from './logger/LogdaLogger'
import {Level} from './logger/Level'

const logdaLevel = new Level()

const setLogdaLevel = (level = 'error') => {
  logdaLevel.update(level)
}

const logdaFactory = () => (tag = '') => {
  return new LogdaLogger({
    tags: [tag],
    level: logdaLevel
  })
}

const logda = logdaFactory()
export {logda, setLogdaLevel}
