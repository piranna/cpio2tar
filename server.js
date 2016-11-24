#!/usr/bin/env node

const createReadStream = require('fs').createReadStream

const gunzip = require('gunzip-maybe')

const cpio2tar = require('.')


var input = process.stdin

const filepath = process.argv[2]
if(filepath) input = createReadStream(filepath)

input.pipe(gunzip()).pipe(cpio2tar(process.stdout))
