class UserController {
  constructor (serviceUser, user, hashPassword) {
    this._service = serviceUser
    this._entity = user
    this._hashPassword = hashPassword
  }

  createNewUser (user) {
    if (user.username && user.email && user.password) {
      const newUser = new this._entity(user)
      console.log(newUser)
      newUser.encryptPassword(user.password, this._hashPassword)
      console.log(newUser)
      const response = this._service.save('user', newUser)
      return response
    } else {
      throw new Error('Missing parameters')
    }
  }

  getAllSong () {
    const response = this._service.all('song')
    return response
  }

  /*  updateSong (param, body) {
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
  } */
}

export default UserController
