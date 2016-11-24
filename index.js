const cpio = require('cpio-stream')
const tar  = require('tar-stream')


function cpio2tar(output)
{
  const extract = cpio.extract()
  const pack    = tar.pack()

  extract.on('entry', function(header, stream, callback)
  {
    stream.pipe(pack.entry(header, callback))
  })

  extract.on('finish', pack.finalize.bind(pack))

  pack.pipe(output)

  return extract
}


module.exports = cpio2tar
