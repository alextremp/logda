import {LogdaLogger, LEVEL} from './logger/LogdaLogger'

const traceLogger = tag => new LogdaLogger({tag, level: LEVEL.trace})
const debugLogger = tag => new LogdaLogger({tag, level: LEVEL.debug})
const infoLogger = tag => new LogdaLogger({tag, level: LEVEL.info})
const warnLogger = tag => new LogdaLogger({tag, level: LEVEL.warn})
const errorLogger = tag => new LogdaLogger({tag, level: LEVEL.error})

export {traceLogger, debugLogger, infoLogger, warnLogger, errorLogger}
