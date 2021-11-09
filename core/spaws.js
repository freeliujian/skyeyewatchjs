const childProcess = require('child_process')
const {spawsStart} = require('./spawsStart')


//编译
let compile = null;
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

module.exports.spaws = spaws;