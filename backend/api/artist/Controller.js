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

  getAllArtist () {
    const response = this._service.all('artist')
    return response
  }

  /*  updateSong (param, body) {
    const response = this._service.update('song', param, body)
    return response
    // console.log('-----> parametro: ', param, ' body: ', body)
    // console.log(song)
    // return 'updated a song'
  } */

  deleteArtist (idArtist) {
    const response = this._service.delete('artist', idArtist)
    return response
  }
}

export default ArtistController
