const exec = require('child_process').exec;
const child = exec('cd src && yarn && cd ../server && yarn && echo BUILT successfully',
    // const child = exec('cd src && npm && cd ../server && npm && echo BUILT successfully',
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });