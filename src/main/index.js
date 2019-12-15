import {LogdaLogger} from './logger/LogdaLogger'
import {configuration} from './logger/Configuration'

const logda = tag => new LogdaLogger({tags: [tag]})
const logdaLevel = level => configuration.configureLevel({level})

export {logda, logdaLevel}
