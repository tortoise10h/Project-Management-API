const fs = require('fs')
const path = require('path')

const runSubseeds = async () => {
  try {
    const processDir = path.resolve(__dirname, 'process')
    const allProcess = fs.readdirSync(processDir)
    for (let i = 0; i < allProcess.length; i++) {
      const process = require(path.resolve(processDir, allProcess[i]))
      await process()
    }
  } catch (ex) {
    console.log('[Exception]', ex)
    console.log(ex.stack)
  }
}

runSubseeds()
