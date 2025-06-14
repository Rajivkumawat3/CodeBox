// handler for js programs

// package imports
const isValid = require('../lib/valid')
const execute = require('../lib/execute')

// execution handling
const jsHandler = async (key, storagePath) => {
  const filePath = storagePath + key

  // RegExp for require(<foo>) statement sanitisation
  const importRE = /require\s*\(\s*['"]\s*(.+)\s*['"]\s*\)/gim

  // list of acceptable libraries
  const acceptList = [
    'readline',
    'buffer',
    'string_decoder',
    'timers',
    'stream',
    'util',
  ]

  // code validity check
  if (!(await isValid(filePath + '.js', false, acceptList, importRE, ''))) {
    return {
      code: 1,
      stdout: '',
      stderr: 'invalid code',
    }
  }

  // at this point, we have validated the code and run execute()
  const result = await execute('js', filePath)
  console.log('retruning to handler with result')
  console.log(result)
  return result
}

// code handler exported
module.exports = jsHandler
