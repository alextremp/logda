import Benchmark from 'benchmark'
import {addLoggers} from './addLoggers'
import CONSOLE from './loggers/consoleLogger'
import LOGDA from './loggers/logdaLogger'
import LOGLEVEL from './loggers/loglevelLogger'
import NIGHTINGALE from './loggers/nightingaleLogger'

const suite = new Benchmark.Suite('loggers benchmark')

addLoggers(suite, [CONSOLE, LOGDA, LOGLEVEL, NIGHTINGALE])

suite
  .on('complete', function() {
    this.forEach(item => console.log(item.toString()))
  })
  .run()
