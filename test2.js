const DownloadYTFile = require('yt-dl-playlist')

const downloader = new DownloadYTFile({ 
  outputPath: process.cwd(),
  ffmpegPath: './ffmpeg/bin/ffmpeg.exe',
  maxParallelDownload: 10,
  fileNameGenerator: (videoTitle) => {
    return 'a-new-file-name.mp3'
  }
})

downloader.on('video-info', (fileInfo, video) => {
  console.log({ fileInfo, video })
})
downloader.on('video-setting', (fileInfo, settings) => {
  console.log({ fileInfo, settings })
})
downloader.on('start', (fileInfo) => console.log(fileInfo))
downloader.on('progress', (fileInfo) => console.log(fileInfo))
downloader.on('complete', (fileInfo) => console.log(fileInfo))
downloader.on('error', (fileInfo) => console.log(fileInfo.error))

//downloader.download(id, inputFileName = null) : Promise<object>
//downloader.downloadPlaylist(playlistId) : Promise<Array>
//
//downloader.getPlaylistInfo(playlistId) : Promise<object>
//downloader.getVideoInfo(videoId) : Promise<object>