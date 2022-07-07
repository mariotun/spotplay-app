export default class AuthController {
  constructor (authServices, entity, comparePassword, generateToken) {
    this._services = authServices
    this._entity = entity
    this._comparePassword = comparePassword
    this._generateToken = generateToken
  }

  async authenticationUser (user) {
    try {
      // const result = this._services.findByAtribute('user', '_username', user.username)
      const result = await this._services.findByAtribute('users', '_username', user.username)
      if (result !== null) {
        const resltComparePassword = await this._comparePassword(user.password, result._password)
        if (resltComparePassword) {
          const tokenUser = this._generateToken(result.id)
          return new this._entity({
            state: true,
            username: result._username,
            email: result._email,
            token: tokenUser,
            message: 'Login successful'
          })
        } else {
          return new this._entity({
            state: false,
            username: '',
            email: '',
            token: '',
            message: 'Sus credenciales son incorrectos'
          })
        }
      } else {
        return new this._entity({})
      }
    } catch (error) {
      return new Error(error)
    }
  }
}
