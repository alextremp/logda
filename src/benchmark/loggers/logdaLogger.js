import {logda, setLogdaLevel} from '../../main'
import {lambdaWrapper} from '../wrapper'
setLogdaLevel('warn')
const logger = logda('Logda')
const benchmarker = lambdaWrapper('Logda', logger)
export default benchmarker
