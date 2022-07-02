class Artist {
  constructor (artist) {
    this._id = null
    this._firstname = artist.firstname
    this._lastname = artist.lastname
    this._avatar = artist.avatar
    this._country = artist.country
    this._birthday = artist.birthday
  }
}

export default Artist
