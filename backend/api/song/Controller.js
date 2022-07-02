// los controller se encargan de realizar la logica del negocio
class SongController {
  constructor (serviceSong, song) {
    this._service = serviceSong
    this._entity = song
  }

  getAllSong () {
    const response = this._service.all('song')
    return response
  }

  createNewSong (song) {
    const newSong = new this._entity(song)
    const response = this._service.save('song', newSong)
    return response
  }

  updateSong (param, body) {
    const response = this._service.update('song', param, body)
    return response
  }

  deleteSong (idSong) {
    // const deleteSon = new this._entity(song)
    const response = this._service.delete('song', idSong)
    return response
  }
}

export default SongController
