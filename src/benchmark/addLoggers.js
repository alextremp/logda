export const addLoggers = (suite, loggers) => {
  const toSuite = (method, builder) => {
    loggers.forEach(b =>
      suite.add(`${method} => [${b.name}]`, () => b[method](builder()))
    )
  }

  const debugMessageBuilder = () => [`data: ${Math.random()}`]
  const errorMessageBuilder = () => [debugMessageBuilder()[0], new Error()]

  toSuite('debugLoggingAString', debugMessageBuilder)
  toSuite('debugLoggingObject', debugMessageBuilder)
  toSuite('errorLoggingAString', errorMessageBuilder)
  toSuite('errorLoggingObject', errorMessageBuilder)
}
