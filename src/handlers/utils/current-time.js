const {
  withStatusCode
} = require('../../utils/response.util')

const ok = withStatusCode(200, JSON.stringify)

exports.handler = (event) => {
  const response = {
    message: `The current time is ${new Date().toTimeString()}.`,
    input: event
  }

  return ok(response)
}
