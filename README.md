<img alt="logda logo" src="https://repository-images.githubusercontent.com/228272146/e8140780-2d03-11ea-914a-91ce7e6fd5ba" width="300">

[![NPM Module](https://img.shields.io/npm/v/logda.svg)](https://www.npmjs.com/package/logda)
[![Build Status](https://travis-ci.org/alextremp/logda.svg?branch=master)](https://travis-ci.org/alextremp/logda)
[![codecov](https://codecov.io/gh/alextremp/logda/branch/master/graph/badge.svg)](https://codecov.io/gh/alextremp/logda)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/alextremp/logda.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/alextremp/logda/context:javascript)
[![Maintainability](https://api.codeclimate.com/v1/badges/53000060cbda73bad602/maintainability)](https://codeclimate.com/github/alextremp/logda/maintainability)

# logda 
**logda** is a lightweight efficient logger thought for developers who use to debug their libraries running in production when something goes wrong, without worrying about global objects or reconfigurations.

* It works as a _console_ wrapper but with **level** capabilites, so no logs will be written down the desired level.
* It receives arrow functions instead of built messages, so when running under the configured level, no heavy log operations will be executed. Also, these operations will never break your app as they run into a catcheable block. 

**Index**

* [Usage](#usage)
* [Benchmarks](#benchmarks)
* [Contributing](#contributing)

## Features

* :rocket: **Efficient logger**: Will not run unnecessary operations, as all logger operations are delegated with an arrow function
* :sparkles: **Pretty printer**: When enabled, distinguish different modules or files using tags 
* :bulb: **Developer ready**: Set the _logda.level_ into your _window.localStorage_ to enable logda loggers for the apps you're reviewing (if you don't remove it from the local storage, you'll be able to review logs the next time you visit the page!)

## Usage

Install

```
npm install logda --save
```

Create a root logger for your module: (optional but recommended for better log messages)

`logger.js`
``` ecmascript 6
import {logda} from 'logda'

const LOG = logda('my-app')

LOG.info(() => 'Logda log initialized')

export default LOG
```

* The exported LOG is a logda logger already, you can call all level methods on it, but also allows creating sub-loggers by calling the _logger_ method. In this case, the _.info_ call (if info is enabled) will print:

  ```
  [INFO] my-app> Logda log initialized
  ```

Import this root logger to all files requiring a logger: (for example, MyService.js)

`MyService.js`
``` ecmascript 6
import LOG from './logger.js

const log = LOG.logger('MyService')

class MyService {
    // ...
    aMethod(params) {
      log.debug(() => ['aMethod', {params}])
    }
}

```

* The created _log_ is a LOG sub-logger that when debug is enabled will print a message like:
  ```
  [DEBUG] my-app|MyService> aMethod {...}
  ```

### Write logs

Logda is intended to be used with arrow functions, so to log messages, call the level method with an arrow function:

```ecmascript 6
log.debug(() => 'log messages as simple strings')
log.debug(() => ['log complex data inside an array', {
  aKey: 'aValue',
  another: calculatedData()
}])
```

>Encapsulating data into an object {} will help you to review it correlating key-valued data in message logs

### Change the log level

Logda accepts 'trace', 'debug', 'info', 'warn', 'error', 'off' levels.

Console correspondency:
* log.trace => console.trace
* log.debug => console.log
* log.info => console.info
* log.error => console.error

'off' is intended to disable all logs including 'error' logs.

* Developer-only level:

In your browser's console, write:

```
window.localStorage.setItem('logda.level', 'debug')
```

* Application level:

In case that you want a lower level to log messages (Node environments, loc/dev builds, ...), you can enable a specific logda level programmatically:

`logger.js`
``` ecmascript 6
import {logda, setLogdaLevel} from 'logda'

setLogdaLevel('info')

const LOG = logda('my-app')

LOG.info(() => 'Logda log initialized')

export default LOG
```

>In this case, 'Logda log initialized' will be printed directly

>In browser environments, the localStorage 'logda.level' (if set) will override the application level

## Benchmarks

```
debugLoggingAString	=>	[Console] x 60,989 ops/sec ±1.84% (81 runs sampled)
debugLoggingAString	=>	[Logda] x 2,389,366 ops/sec ±6.53% (78 runs sampled)
debugLoggingAString	=>	[Loglevel] x 2,677,622 ops/sec ±7.42% (75 runs sampled)
debugLoggingAString	=>	[Nightingale] x 1,007,466 ops/sec ±3.80% (81 runs sampled)

debugLoggingObject	=>	[Console] x 18,662 ops/sec ±2.93% (68 runs sampled)
debugLoggingObject	=>	[Logda] x 2,289,789 ops/sec ±6.90% (83 runs sampled)
debugLoggingObject	=>	[Loglevel] x 652,305 ops/sec ±3.71% (86 runs sampled)
debugLoggingObject	=>	[Nightingale] x 442,387 ops/sec ±3.09% (88 runs sampled)

errorLoggingAString	=>	[Console] x 1,564 ops/sec ±6.63% (51 runs sampled)
errorLoggingAString	=>	[Logda] x 1,491 ops/sec ±6.99% (71 runs sampled)
errorLoggingAString	=>	[Loglevel] x 1,561 ops/sec ±6.47% (50 runs sampled)
errorLoggingAString	=>	[Nightingale] x 22,158 ops/sec ±2.92% (76 runs sampled)

errorLoggingObject	=>	[Console] x 799 ops/sec ±6.07% (63 runs sampled)
errorLoggingObject	=>	[Logda] x 776 ops/sec ±6.31% (76 runs sampled)
errorLoggingObject	=>	[Loglevel] x 810 ops/sec ±3.60% (57 runs sampled)
errorLoggingObject	=>	[Nightingale] x 889 ops/sec ±10.71% (67 runs sampled)
```

Logda is intended to be blazing fast when the logging level is disabled, as it does not run the log operation, neither any operation needed to build the log message, in that case.

Fast analysis of the benchmark results:
- Logda and Loglevel are very efficient solutions when the log level is not enabled to write logs.
- Note the difference in __debugLoggingObject__ suite where Logda is clearly the winner. In that suite, loggers are building an Object to log when no log will be printed. **Logda will not build any Object then**, that's the reason why it's faster in that case ;)
- When logging, Logda, Loglevel and the Console logger are quite similar, as they have to log and the differences are mainly the quantity of text that they output to the console. Logda writes a pretty/searchable message using it's logger name, so it pays an additional cost (irrelevant in %) in that case.
- Nightingale writes faster in error logs, but it's not writing the error stack traces, saving the writing cost, but loosing what the logger intention should be.  

**Note:**
To run the benchmarks, just clone the repo and run:

```
npm run benchmark
```

Feel free to include new loggers to the benchmarks :)

## Contributing

:wrench: Maintenance info

### Available Scripts

_npm run_...
* **phoenix** to reset the project reinstalling its dependencies
* **lint** to check the code format
* **test** to run the project tests
* **check** to run both lint&test
* **coverage** to get an html test coverage report
* **build** to build the project
* **versiona** to publish a new version of the library (in Travis CI)

### Create a PR

Use the PR template to explain the better possible:
* Why the PR should be merged
* How can be checked

### Deploying

This project uses Travis CI for:
* PR validation
* Merge to master validation
* NPM publications on Release tag creation

To create a new Release, take in mind:
* The Release Tag must be named *vX.Y.Z* where X.Y.Z are the _semver_ numbers that will correspond to the published package's version.
* Travis CI will launch the versiona.js script which will:
  * Update the package.json to the X.Y.Z version set in the Release Tag
  * Publish the NPM package with the X.Y.Z version
