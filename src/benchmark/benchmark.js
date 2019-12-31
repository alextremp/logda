import Benchmark from 'benchmark'

import CONSOLE from './loggers/consoleLogger'
import LOGDA from './loggers/logdaLogger'
import LOGLEVEL from './loggers/loglevelLogger'
import NIGHTINGALE from './loggers/nightingaleLogger'

const benchmarkers = [CONSOLE, LOGDA, LOGLEVEL, NIGHTINGALE]

const suite = new Benchmark.Suite('loggers benchmark')

const toSuite = (method, builder) => {
  benchmarkers.forEach(b =>
    suite.add(`${method} => [${b.name}]`, () => b[method](builder()))
  )
}

const debugMessageBuilder = () => [`data: ${Math.random()}`]
const errorMessageBuilder = () => [debugMessageBuilder()[0], new Error()]

toSuite('debugLoggingAString', debugMessageBuilder)
toSuite('debugLoggingObject', debugMessageBuilder)
toSuite('errorLoggingAString', errorMessageBuilder)
toSuite('errorLoggingObject', errorMessageBuilder)

suite
  .on('complete', function() {
    this.forEach(item => console.log(item.toString()))
  })
  .run()
