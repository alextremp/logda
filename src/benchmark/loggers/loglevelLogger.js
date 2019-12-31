import loglevel from 'loglevel'
import {commonWrapper} from '../wrapper'

const logger = loglevel.getLogger('Loglevel')
logger.setLevel('warn')

const benchmarker = commonWrapper('Loglevel', logger)

export default benchmarker
