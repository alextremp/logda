import {expect} from 'chai'
import sinon from 'sinon'
import {logda, logdaLevel} from './../main/index'
import {LEVEL} from '../main/logger/Level'

describe('index', () => {
  const infoSpy = sinon.spy(console, 'info')
  const warnSpy = sinon.spy(console, 'warn')
  beforeEach(() => {
    global.window = undefined
    infoSpy.resetHistory()
    warnSpy.resetHistory()
  })

  it('should be error level by default', () => {
    const log = logda()
    expect(log.level).to.equal(LEVEL.error.label)
    log.info(() => 'test')
    expect(infoSpy.callCount).to.equal(0)
  })

  it('should get the global log level', () => {
    logdaLevel('info')
    const log = logda()
    expect(log.level).to.equal(LEVEL.info.label)
    log.info(() => 'test')
    expect(infoSpy.callCount).to.equal(1)
  })

  it('should be able to create a tagged logger', () => {
    logdaLevel('info')
    const log = logda('Test')
    log.info(() => 'hello')
    expect(infoSpy.getCall(0).args).deep.equal(['[INFO]>Test>', 'hello'])
  })

  it('should be able to create sub tagged loggers', () => {
    logdaLevel('info')
    const appLogger = logda('Test')
    const log1 = appLogger.logger('Component1')
    const log2 = appLogger.logger('Component2')

    log1.info(() => 'from 1')
    log2.info(() => 'from 2')

    expect(infoSpy.getCall(0).args).deep.equal([
      '[INFO]>Test|Component1>',
      'from 1'
    ])
    expect(infoSpy.getCall(1).args).deep.equal([
      '[INFO]>Test|Component2>',
      'from 2'
    ])
  })

  it('should not fail if provider is not a function', () => {
    logdaLevel('info')
    const log = logda()
    log.info('not a function')
    expect(warnSpy.callCount).to.equal(1)
    expect(infoSpy.callCount).to.equal(0)
  })

  it('should not fail if provider throws an exception', () => {
    logdaLevel('info')
    const log = logda()
    log.info(() => {
      throw new Error('Owwww')
    })
    expect(warnSpy.callCount).to.equal(1)
    expect(infoSpy.callCount).to.equal(0)
  })

  it('should override the level with the local storage level', () => {
    global.localStorage = {
      getItem: () => 'debug'
    }
    logdaLevel('info')
    const log = logda()
    expect(log.level).to.equal(LEVEL.debug.label)
  })
})
