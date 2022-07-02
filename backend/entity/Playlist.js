export class Playlist {
  constructor (playlist) {
    this._id = null
    this._name = playlist.name
    this._avatar = playlist.avatar
    this._duration = playlist.duration
  }
}

export class PlaylistSong {
  constructor (playlistSong) {
    this._idSong = playlistSong.idSong
    this._idPlaylist = playlistSong.idPlaylist
  }
}
