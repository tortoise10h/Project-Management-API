/* eslint-disable */
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
prompt.start();

const schema = {
    properties: {
        port: {
            // pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi,
            message: 'Port of api',
            required: true,
            type: 'string',
            default: '3000'
        },
    }
};


prompt.get(schema, async function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:', result);
    const processDir = path.resolve(__dirname, 'process');
    const allProcess = fs.readdirSync(processDir);
    for (let i = 0; i < allProcess.length; i++) {
        const process = require(path.resolve(processDir, allProcess[i]));
        await process(`http://localhost:${result.port}`);
    }
});
      
    