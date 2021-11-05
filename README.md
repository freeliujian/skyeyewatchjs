# tstoresx

国际化根据ts文件创建resx文件

## 使用说明

直接输入指令：tstoresx

## 查看版本

tstoresx -v 或 tstoresx vsersion

### 如何使用
npm install --dev tstoresx or yarn add --dev tstoresx

## 配置文件

### 名称
.tstoresx.ts 

### 示例

const config = {
    //需要转换的文件路径
    path:'./src/locales/zh-CN.ts'
};

exports.config = config;


