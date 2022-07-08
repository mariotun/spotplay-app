class SongController {
  constructor (serviceSong, song) {
    this._service = serviceSong
    this._entity = song
  }

  async createNewSong (song) {
    if (song.title && song.uri && song.duration) {
      const newSong = new this._entity(song)
      const response = await this._service.save('song', newSong)
      return response
    } else {
      throw new Error('Missing parameters')
    }
  }

  async getAllSong () {
    const response = await this._service.all('song')
    return response
  }

  async getOneSong (idSong) {
    const response = await this._service.one('song', idSong)
    return response
  }

  updateSong (parametro, song) {
    const updateUser = new this._entity(song)
    const response = this._service.update('song', parametro, updateUser)
    return response
  }

  deleteSong (idSong) {
    const response = this._service.delete('song', idSong)
    return response
  }
}

export default SongController
