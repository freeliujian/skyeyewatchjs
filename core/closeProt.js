const childProcess = require('child_process');
const { config } = require('../config')
const shell = require('shelljs')
const { exec } = require('shelljs')
const port = config.port

const closeProt = function () {
    //关闭端口
    let closeProtSpwn = null;
    //获取端口
    let getPortSpwn = null;
    //端口号
    let closeProtNum = 0;



    getPortSpwn = childProcess.execSync('netstat -ano | findstr :'+port).toString()
    closeProtNum = getPortSpwn.replace(/\s/g,"").split('G')[getPortSpwn.replace(/\s/g,"").split('G').length-1]
    console.log(closeProtNum)
    closeProtSpwn
        = childProcess.spawn('taskkill', ['/PID',closeProtNum,'/F'], { stdio: 'inherit' });
    closeProtSpwn.on('close', code => {
        console.log('close:'+code)
    })
}

module.exports.closeProt = closeProt;