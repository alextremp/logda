import {LogdaLogger, LEVEL} from './logger/LogdaLogger'

const resolveLevel = input => LEVEL[input] || LEVEL.off

const create = (tag, level) => new LogdaLogger({tag, level, console})
const logda = ({tag, level}) => create(tag, resolveLevel(level), console)

export {logda}
