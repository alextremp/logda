import {expect} from 'chai'
import sinon from 'sinon'
import {LogdaLogger, LEVEL} from '../../main/logger/LogdaLogger'

describe('LogdaLogger', () => {
  let console
  const givenTag = 'Test'
  const logda = (level, tag = givenTag) => new LogdaLogger({tag, level, console})
  beforeEach(() => {
    console = {
      trace: sinon.spy(),
      log: sinon.spy(),
      info: sinon.spy(),
      warn: sinon.spy(),
      error: sinon.spy()
    }
  })
  it('should log to all levels with trace logger', () => {
    const logger = logda(LEVEL.trace)
    logger.trace(() => 'Hello trace')
    logger.debug(() => 'Hello debug')
    logger.info(() => 'Hello info')
    logger.warn(() => 'Hello warn')
    logger.error(() => 'Hello error')
    expect(console.trace.callCount).to.equal(1)
    expect(console.log.callCount).to.equal(1)
    expect(console.info.callCount).to.equal(1)
    expect(console.warn.callCount).to.equal(1)
    expect(console.error.callCount).to.equal(1)
  })
  it('should not trace in debug mode', () => {
    const logger = logda(LEVEL.debug)
    logger.trace(() => '')
    expect(console.trace.callCount).to.equal(0)
  })
  it('should not log debug in info mode', () => {
    const logger = logda(LEVEL.info)
    logger.debug(() => '')
    expect(console.log.callCount).to.equal(0)
  })
  it('should not info in warn mode', () => {
    const logger = logda(LEVEL.warn)
    logger.info(() => '')
    expect(console.info.callCount).to.equal(0)
  })
  it('should not warn in error mode', () => {
    const logger = logda(LEVEL.error)
    logger.warn(() => '')
    expect(console.warn.callCount).to.equal(0)
  })
  it('should log error in info mode', () => {
    const logger = logda(LEVEL.info)
    logger.error(() => '')
    expect(console.error.callCount).to.equal(1)
  })
  it('should log a string message with tag label', () => {
    const logger = logda(LEVEL.info)
    const givenMessage = 'hello'
    logger.info(() => givenMessage)
    const output = console.info.getCall(0).args
    expect(output).to.include(givenMessage)
    expect(output).to.include(givenTag)
    expect(output).to.include(LEVEL.info.label)
  })
})
