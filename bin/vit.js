#!/usr/bin/env node

const { createServer } = require('../dist/server/server.js')

const PORT = 4000
const cwd = process.cwd()

console.log({ PORT, cwd })

createServer({ cwd, port: PORT })
