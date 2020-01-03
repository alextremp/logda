import {expect} from 'chai'
import {logda, setLogdaLevel} from '../../main/index'
import {LEVEL} from '../../main/logger/Level'

describe('when not in browser', () => {
  beforeEach(() => {
    setLogdaLevel()
  })
  it('should have the level by default when no window is found', () => {
    const log = logda()
    expect(log.level).to.equal(LEVEL.error.label)
  })
  it('should be able to change the log level', () => {
    const log = logda()
    setLogdaLevel('debug')
    expect(log.level).to.equal(LEVEL.debug.label)
  })
})
