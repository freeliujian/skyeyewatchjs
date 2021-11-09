
const childProcess = require('child_process');
const {closeProt} = require('./closeProt');
const path  = require('path')
//准备
let start = null ;


const spawsStart = function(){

    const npm = process.env.npm;
    closeProt();

    start
    = childProcess.spawn(npm, ['run', 'start'], { cwd: path.resolve(process.cwd(), './test'),stdio:'inherit' });

    start.on('close', code => {

        console.log('message:'+code);

    })
}

module.exports.spawsStart = spawsStart;