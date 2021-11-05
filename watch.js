const chokidar = require('chokidar')
const childProcess = require('child_process');
const path = require('path')

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
let watcher = null
let ready = false

let chunk = null;


const spaws = function () {
    let compile = null;
    console.log('开始编译')
    //编译目录
    compile
        = childProcess.spawn(npm, ['run', 'build'], { cwd: path.resolve(process.cwd(), './test') });


    //编译结果打印
    compile.stderr.on('data', function (data) {
        chunk += data
    });

    compile.on('error', (err) => {
        console.log(err);
    });

    compile.on('close', code => {
        console.log(chunk)
        console.log('🎉 build success')
    })
}





module.exports.watch = function () {

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