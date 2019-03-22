const AWS = require('aws-sdk')
const {
  parseWith
} = require('../../utils/request.util')
const {
  withStatusCode
} = require('../../utils/response.util')

const SES = new AWS.SES()
const parseJson = parseWith(JSON.parse)
const ok = withStatusCode(200, JSON.stringify)

exports.handler = async (event) => {
  const {
    body
  } = event
  const request = parseJson(body)
  const email = request.email

  const resultPromise = await SES.sendEmail({
    Source: 'noreply@example.com',
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `This email has been sent using AWS SES invoked by AWS Lambda.`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Welcome from AWS Lambda!`
      }
    }
  })

  Promise.all(resultPromise.promise).then((res) => {
    return ok(res)
  }).catch((err) => {
    console.log(err)
  })
}
