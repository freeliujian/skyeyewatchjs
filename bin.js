#!/usr/bin/env node
const {watch} = require('./core/watch');
const {spawsStart} = require('./core/spawsStart');

const {closeProt} = require('./core/closeProt')

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'



console.log('✨ start ⚡️');

process.env.npm = npm

watch();
//spawsStart();
//closeProt()