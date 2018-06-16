'use strict'
const fs = require('fs')
const spawn = require('cross-spawn')

console.log('[Starting Mock Server]')

const argv = process.argv.slice(2)
const watchDir = argv[0]

if (fs.existsSync(watchDir)) {
  const watch = spawn(
    'nodemon',
    ['-w', argv[0], '--exec', 'babel-node ' + argv[0] + ' --presets env'],
    { stdio: 'inherit' }
  )
} else {
  console.log('Serve directory %s does not exist', watchDir)
}
