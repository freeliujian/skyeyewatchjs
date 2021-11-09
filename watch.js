const childProcess = require('child_process');
const chokidar = require('chokidar')
const path = require('path')
const chalk = require('chalk');
const {config} = require('./config')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const port = config.port


//监听是否准备
let ready = false;
//准备
let start = null ;
//编译
let compile = null;
//关闭端口
let closeProt = null;


let closeProtFlag = false;

const spawsStart = function(){
    
    start
    = childProcess.spawn(npm, ['run', 'start'], { cwd: path.resolve(process.cwd(), './test'),stdio:'inherit' });

    start.on('close', code => {

        console.log('message:'+code);

    })
}

const closeProt = function(){
    console.log(port)
    closeProt
    = childProcess.spawn('lsof',['-i',':'+port])

    closeProt.stdout


}

const spaws = function () {
  
    console.log('开始编译')
    //编译目录
    compile
        = childProcess.spawn(npm, ['run', 'build:client'], { cwd: path.resolve(process.cwd(), './test') ,stdio:'inherit'});
    compile.on('close', code => {
        console.log(chalk.green('🎉 complete success'));
        console.log(chalk.green('编译结束，正在重新启动项目'))
        spawsStart()
    })
}

const watch = function (){

     // 文件新增时
     function addFileListener(path_) {
        if (ready) {
            console.log('File', path_, '🔨 has been added')

            spaws()
        }
    }
    function addDirecotryListener(path) {
        if (ready) {
            console.log('Directory', path, '🔨 has been added')
            spaws()
        }
    }

    // 文件内容改变时
    function fileChangeListener(path_) {


        console.log('File', path_, '🎨 has been changed 💄')
        
        spaws()
    }

    // 删除文件时，需要把文件里所有的用例删掉
    function fileRemovedListener(path_) {
        console.log('File', path_, '🔥 has been removed')
        
        spaws()
    }

    // 删除目录时
    function directoryRemovedListener(path) {

        console.info('Directory', path, '🔥 has been removed')
        
        spaws()
    }


    //监听文件
    if (!watcher) {
        watcher = chokidar.watch('./test/src')
    }


    watcher
        .on('add', addFileListener)
        .on('addDir', addDirecotryListener)
        .on('change', fileChangeListener)
        .on('unlink', fileRemovedListener)
        .on('unlinkDir', directoryRemovedListener)
        .on('error', function (error) {
            console.info('Error happened', error);
        })
        .on('ready', function () {
            console.info('Initial scan complete. Ready for changes.');
            ready = true
        })
}



module.exports.watch =watch;
module.exports.spawsStart=spawsStart;
module.exports.closeProt = closeProt;