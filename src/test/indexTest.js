import './support/mockGlobal'
import {expect} from 'chai'
import sinon from 'sinon'
import {logda, setLogdaLevel} from './../main/index'
import {LEVEL} from '../main/logger/Level'

describe('index', () => {
  let consoleInfo
  let consoleWarn
  let consoleError
  let infoSpy
  let warnSpy
  before(() => {
    consoleInfo = console.info
    consoleWarn = console.warn
    consoleError = console.error
    console.info = () => null
    console.warn = () => null
    console.error = () => null
    infoSpy = sinon.spy(console, 'info')
    warnSpy = sinon.spy(console, 'warn')
  })
  after(() => {
    console.info = consoleInfo
    console.warn = consoleWarn
    console.error = consoleError
  })
  beforeEach(() => {
    setLogdaLevel('info')
    infoSpy.resetHistory()
    warnSpy.resetHistory()
  })

  it('should be error level by default', () => {
    setLogdaLevel()
    const log = logda()
    expect(log.level).to.equal(LEVEL.error.label)
    log.trace(() => 'test')
    log.debug(() => 'test')
    log.info(() => 'test')
    expect(infoSpy.callCount).to.equal(0)
  })

  it('should be error level if an invalid level is passed', () => {
    setLogdaLevel('whatever')
    const log = logda()
    expect(log.level).to.equal(LEVEL.error.label)
  })

  it('should get the global log level', () => {
    const log = logda()
    expect(log.level).to.equal(LEVEL.info.label)
    log.info(() => 'test')
    expect(infoSpy.callCount).to.equal(1)
  })

  it('should be able to create a tagged logger', () => {
    const log = logda('Test')
    log.info(() => 'hello')
    expect(infoSpy.getCall(0).args).deep.equal(['[INFO] Test>', 'hello'])
  })

  it('should be able to create sub tagged loggers', () => {
    const appLogger = logda('Test')
    const log1 = appLogger.logger('Component1')
    const log2 = appLogger.logger('Component2')
    const log3 = appLogger.logger()

    log1.info(() => 'from 1')
    log2.info(() => 'from 2')
    log3.info(() => 'from 3')

    expect(infoSpy.getCall(0).args).deep.equal([
      '[INFO] Test|Component1>',
      'from 1'
    ])
    expect(infoSpy.getCall(1).args).deep.equal([
      '[INFO] Test|Component2>',
      'from 2'
    ])
    expect(infoSpy.getCall(2).args).deep.equal(['[INFO] Test>', 'from 3'])
  })

  it('should not fail if provider is not a function', () => {
    const log = logda()
    expect(() => log.error('not a function')).to.not.throw()
  })

  it('should not fail if provider throws an exception', () => {
    const log = logda()
    expect(() =>
      log.error(() => {
        throw new Error('Owwww')
      })
    ).to.not.throw()
  })

  it('should override the level with the local storage level', () => {
    window.localStorage.setItem('logda.level', 'debug')
    setLogdaLevel('info')
    const log = logda()
    expect(log.level).to.equal(LEVEL.debug.label)
  })
})
