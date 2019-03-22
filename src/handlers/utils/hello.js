const {
  withStatusCode
} = require('../../utils/response.util')

const ok = withStatusCode(200, JSON.stringify)

exports.handler = (event) => {
  const response = {
    message: `Hello from the ${process.env.SERVICE_NAME} service!`,
    input: event
  }

  return ok(response)
}
