#!/usr/bin/env node

const cpio   = require('cpio-stream')
const gunzip = require('gunzip-maybe')
const tar    = require('tar-stream')


const extract = cpio.extract()
const pack    = tar.pack()

extract.on('entry', function(header, stream, callback)
{
  stream.pipe(pack.entry(header, callback))
})

extract.on('finish', pack.finalize.bind(pack))

process.stdin.pipe(gunzip()).pipe(extract)
pack.pipe(process.stdout)
