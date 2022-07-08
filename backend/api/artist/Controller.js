class ArtistController {
  constructor (serviceArtist, artist) {
    this._service = serviceArtist
    this._entity = artist
  }

  createNewArtist (artist) {
    if (artist.firstname && artist.lastname && artist.avatar && artist.country && artist.birthday) {
      const newArtist = new this._entity(artist)
      const response = this._service.save('artist', newArtist)
      return response
    } else {
      throw new Error('Missing parameters')
    }
  }

  async getAllArtist () {
    const response = await this._service.all('artist')
    return response
  }

  async getOneUser (idArtist) {
    const response = await this._service.all('artist')
    return response
  }

  updateArtist (parametro, artist) {
    const updateArtist = new this._entity(artist)
    const response = this._service.update('artist', parametro, updateArtist)
    return response
  }

  deleteArtist (idArtist) {
    const response = this._service.delete('artist', idArtist)
    return response
  }
}

export default ArtistController
