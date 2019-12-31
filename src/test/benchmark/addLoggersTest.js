import {expect} from 'chai'
import {commonWrapper, lambdaWrapper} from '../../benchmark/wrapper'
import {addLoggers} from '../../benchmark/addLoggers'

describe('addLoggers', () => {
  const methods = [
    'debugLoggingAString',
    'debugLoggingObject',
    'errorLoggingAString',
    'errorLoggingObject'
  ]
  it('should add the benchmarked methods to a suite for each logger', () => {
    const logger1 = commonLoggerMockBuilder()
    const logger2 = lambdaLoggerMockBuilder()
    const wrapper1 = commonWrapper('logger1', logger1)
    const wrapper2 = lambdaWrapper('logger2', logger2)
    const suiteMock = {
      added: [],
      add: (title, callable) => suiteMock.added.push({title, callable})
    }
    addLoggers(suiteMock, [wrapper1, wrapper2])
    const validateAdded = (method, logger) =>
      expect(
        suiteMock.added.filter(
          call =>
            call.title.includes(method) && call.title.includes(logger.name)
        ).length,
        `method [${method}], logger [${logger.name}]`
      ).to.equal(1)
    methods.forEach(method => {
      validateAdded(method, wrapper1)
      validateAdded(method, wrapper2)
    })
    suiteMock.added.forEach(item => {
      item.callable()
    })
    expect(logger1.debugCalls).to.equal(2)
    expect(logger1.errorCalls).to.equal(2)
    expect(logger2.debugCalls).to.equal(2)
    expect(logger2.errorCalls).to.equal(2)
  })
})

const commonLoggerMockBuilder = () => {
  const loggerMock = {
    debugCalls: 0,
    errorCalls: 0,
    debug: () => loggerMock.debugCalls++,
    error: () => loggerMock.errorCalls++
  }
  return loggerMock
}

const lambdaLoggerMockBuilder = () => {
  const loggerMock = {
    debugCalls: 0,
    errorCalls: 0,
    debug: f => {
      loggerMock.debugCalls++
      f()
    },
    error: f => {
      loggerMock.errorCalls++
      f()
    }
  }
  return loggerMock
}
