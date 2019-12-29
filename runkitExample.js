const {logda, setLogdaLevel} = require('logda')

// use this only in Node projects or in Browser projects that require enabled low-level logging
setLogdaLevel('info')

// create a root logger
const log1 = logda('RunkitSample')
log1.info(() => 'thanks for using logda!')

// you can create a sub-logger (and you'd be able to create a log2.logger too!)
const log2 = log1.logger('SubLogger')

// if any error occurs building your message to log, logda will catch it avoiding your app to be broken by a log message! but will warn, because it would be nice to be fixed ;)
log2.info(() => {
  throw new Error("This won't break your app, just will WARN in the console!")
})

const params = {
  a: 'param'
}
log2.info(() => ['Write pretty messages!', {params}])

// as loggers are configured in info level, debug logs will be discarded in this sample
log2.debug(() => 'This message will be discarded!')
