// los controller se encargan de realizar la logica del negocio
class ArtistController {
  constructor (serviceArtist, artist) {
    this._service = serviceArtist
    this._entity = artist
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

export default ArtistController
