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
      // const response = this._service.save('user', newUser)
      const response = this._service.save('users', newUser)
      return response
    } else {
      throw new Error('Missing parameters')
    }
  }

  getAllUser () {
    const response = this._service.all('users')
    return response
  }

  /*  updateSong (param, body) {
    const response = this._service.update('song', param, body)
    return response
    // console.log('-----> parametro: ', param, ' body: ', body)
    // console.log(song)
    // return 'updated a song'
  } */

  deleteUser (idUser) {
    const response = this._service.delete('user', idUser)
    return response
  }
}

export default UserController
