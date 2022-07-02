class PlaylistController {
  constructor (servicePlaylist, playlist) {
    this._service = servicePlaylist
    this._entity = playlist
  }

  createNewPlaylist (playlist) {
    if (playlist.name && playlist.avatar && playlist.duration) {
      const newPlaylist = new this._entity(playlist)
      const response = this._service.save('playlist', newPlaylist)
      return response
    } else {
      throw new Error('Missing parameters')
    }
  }

  getAllPlaylist () {
    const response = this._service.all('playlist')
    return response
  }

  /*  updateSong (param, body) {
    const response = this._service.update('song', param, body)
    return response
    // console.log('-----> parametro: ', param, ' body: ', body)
    // console.log(song)
    // return 'updated a song'
  } */

  deletePlaylist (idPlaylist) {
    const response = this._service.delete('playlist', idPlaylist)
    return response
  }
}

export default PlaylistController
