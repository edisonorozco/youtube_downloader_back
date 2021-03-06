const fs = require('fs')
const path = require('path')
const youtubedl = require('youtube-dl')

function playlist(url) {

  'use strict'
  const video = youtubedl(url)

  video.on('error', function error(err) {
    console.log('error 2:', err)
  })

  let size = 0

  video.on('info', function (info) {
    console.log("Aca")
    size = info.size
    let output = path.join(__dirname + '/mp3/', size + '.mp3')
    video.pipe(fs.createWriteStream(output))
  })

  let pos = 0

  video.on('data', function data(chunk) {
    pos += chunk.length
    // `size` should not be 0 here.
    if (size) {
      let percent = (pos / size * 100).toFixed(2)
      process.stdout.cursorTo(0)
      process.stdout.clearLine(1)
      process.stdout.write(percent + '%')
    }
  })

  video.on('next', playlist)
}

playlist('https://www.youtube.com/playlist?list=PL709D90207A5FA4D9')