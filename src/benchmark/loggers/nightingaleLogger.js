import Logger, {configure, levels} from 'nightingale'
import ConsoleHandler from 'nightingale-console'
import {commonWrapper} from '../wrapper'
configure([
  {
    keys: ['Nightingale'],
    handlers: [new ConsoleHandler(levels.WARN)]
  }
])
const logger = new Logger('Nightingale')
const benchmarker = commonWrapper('Nightingale', logger)
export default benchmarker
