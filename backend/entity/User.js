export class User {
  constructor (user) {
    this._id = null
    this._username = user.username
    this._email = user.email
    this._password = user.password
  }

  encryptPassword (password, hashPassword) {
    this._password = hashPassword(password)
  }
}

export class Role {
  constructor (role) {
    this._id = null
    this._name = role.name
    this._description = role.description
  }
}

export class AccountType {
  constructor (accountTipe) {
    this._id = null
    this._name = accountTipe.name
    this._description = accountTipe.description
  }
}
