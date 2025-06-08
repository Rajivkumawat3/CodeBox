// package imports
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const path = require('path')

const isDocker = process.env.DOCKER_ENV === 'true';

const USERSTORAGEPATH = isDocker
  ? '/storage/'
  : path.join(__dirname, '..', '..', 'storage') + path.sep;
  console.log(`path: ${USERSTORAGEPATH}`)

const router = express.Router()

// middleware
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))

// routes

// GET handler for /
router.get('/', async (req, res) => {
  res.send(`POST programs to localhost:9000/code`)
})

// GET handler for /code
router.get('/code', (req, res) => {
  const key = crypto.randomBytes(5).toString('hex') // provides a unique key to a client
  res.send(key)
})

// POST handler for /code
router.post('/code', (req, res) => {
  // request body destructured
  const {
    key, // a unique key identifying each user
    language, // specifies programming language, doubles as file extension for storage/code.xyz file
    input, // user's input string to be stored in storage/input
    code, // user's code string to be stored in storage/code.xyz
  } = req.body
  console.log('body', req.body)
  console.log(`key: ${key}`)
  console.log(`language: ${language}`)
  console.log(`path: ${USERSTORAGEPATH}`)

  const inputFilePath = USERSTORAGEPATH + key
  console.log(`inputFilePath: ${inputFilePath}`)
  const codeFilePath = USERSTORAGEPATH + key
  console.log(`codefilepath: ${codeFilePath}`)

  // storage for input
  fs.writeFile(inputFilePath, input, (inpFileErr) => {
    if (inpFileErr) {
      res.send({ stderr: `input err ${inpFileErr}` })
      return
    }

    // storage for user's program
    fs.writeFile(codeFilePath + '.' + language, code, async (codeFileErr) => {
      if (codeFileErr) {
        res.send({ stderr: `code err ${codeFileErr}` })
        return
      }

      // switching logic to call language specific handler

    })
  })
})

router.get('*', async (req, res) => {
  res.status(404).send(`POST programs to localhost:9000/code`)
})
// router exported to index
module.exports = router
