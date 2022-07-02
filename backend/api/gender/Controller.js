// los controller se encargan de realizar la logica del negocio
class SongController {
  constructor (serviceSong, song) {
    this._service = serviceSong
    this._entity = song
  }

  getAllSong () {
    const songs = [{
      id: 1,
      name: 'name1',
      artist: 'artist1',
      album: 'album1'
    }]
    return songs
    // return 'all songs'
  }

  createNewSong (song) {
    const newSong = new this._entity(song)
    const response = this._service.save('song', newSong)
    return response
    // console.log('songs: ', song)
    // return 'created new song'
  }

  updateSong (param, body) {
    const response = this._service.update('song', param, body)
    return response
    // console.log('-----> parametro: ', param, ' body: ', body)
    // console.log(song)
    // return 'updated a song'
  }

  deleteSong (idSong) {
    // const deleteSon = new this._entity(song)
    const response = this._service.delete('song', idSong)
    return response
    // console.log(song)
    // return 'deleted a song'
  }
}

export default SongController
