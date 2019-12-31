const commonWrapper = (name, logger) => ({
  name,
  debugLoggingAString: data => logger.debug(`Received: ${data[0]}`),
  errorLoggingAString: data => logger.error(`Received: ${data[0]}`, data[1]),
  debugLoggingObject: data =>
    logger.debug(`Received: ${data[0]}`, {
      data,
      timestamp: new Date(),
      costly: JSON.stringify(data)
    }),
  errorLoggingObject: data =>
    logger.error(
      `Received: ${data[0]}`,
      {
        data,
        timestamp: new Date(),
        costly: JSON.stringify(data)
      },
      data[1]
    )
})

const lambdaWrapper = (name, logger) => ({
  name,
  debugLoggingAString: data => logger.debug(() => `Received: ${data[0]}`),
  errorLoggingAString: data =>
    logger.error(() => [`Received: ${data[0]}`, data[1]]),
  debugLoggingObject: data =>
    logger.debug(() => [
      `Received: ${data[0]}`,
      {
        data,
        timestamp: new Date(),
        costly: JSON.stringify(data)
      }
    ]),
  errorLoggingObject: data =>
    logger.error(() => [
      `Received: ${data[0]}`,
      {
        data,
        timestamp: new Date(),
        costly: JSON.stringify(data)
      },
      data[1]
    ])
})

export {commonWrapper, lambdaWrapper}
