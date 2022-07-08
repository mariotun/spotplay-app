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
      const response = this._service.save('user', newUser)
      return response
    } else {
      throw new Error('Missing parameters')
    }
  }

  getAllUser () {
    const response = this._service.all('user')
    return response
  }

  getOneUser (idUser) {
    const response = this._service.one('user', idUser)
    return response
  }

  updateUser (parametro, user) {
    const updateUser = new this._entity(user)
    updateUser.encryptPassword(user.password, this._hashPassword)
    const response = this._service.update('user', parametro, updateUser)
    return response
  }

  deleteUser (idUser) {
    const response = this._service.delete('user', idUser)
    return response
  }
}

export default UserController
