// imports
const axios = require('axios')

const EXECUTOR_HOST = process.env.DOCKER_ENV === 'true'
  ? 'http://executor:8080'
  : 'http://localhost:8080'

// execution function
const execute = async (language, filePath) => {
  const data = { filePath: filePath }
  const options = { // http request headers
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }  

    
  const result =  await axios.post(`${EXECUTOR_HOST}/code/${language}`, data, options) // axios posts to executor in the second container
  return result.data
}

module.exports = execute
