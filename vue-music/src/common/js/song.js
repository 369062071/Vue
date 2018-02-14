export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.albummid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9923701325&fromtag=999`
    url: 'http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?guid=9923701325&vkey=FE6BD1ED77E7756338C00DA8E33753F7C3DEE576EFF3860BC07366CFEACA9A8BBDE693AF74B5FE13275E5C2EFC28C7DEAC734A1D85055414&uin=&fromtag=999'
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
