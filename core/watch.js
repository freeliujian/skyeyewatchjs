
const chokidar = require('chokidar')
const {spaws} = require('./spaws');

//监听
let watcher = null

//监听是否准备
let ready = false;
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

module.exports.watch=watch;