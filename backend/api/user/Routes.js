class UserRouter {
  constructor (router, controller, response, httpcode, createUserValidation) {
    this._router = router()// instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpcode = httpcode
    this._chekUser = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetUser.bind(this))
    this._router.get('/:id', this.handleGetOneUser.bind(this))
    this._router.post('/singup', this._chekUser, this.handleSingUp.bind(this))
    this._router.put('/:id', this.handleUpdateUser.bind(this))
    this._router.delete('/:id', this.handleDeleteUser.bind(this))
  }

  handleSingUp (req, res) {
    const result = this._ctrl.createNewUser(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.CREATED)
  }

  async handleGetUser (req, res) {
    try {
      const result = await this._ctrl.getAllUser()
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      // console.log('handle-->', result)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  async handleGetOneUser (req, res) {
    try {
      const result = await this._ctrl.getOneUser(req.params)
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      console.log(result)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  handleUpdateUser (req, res) {
    const result = this._ctrl.updateUser(req.params, req.body)
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleDeleteUser (req, res) {
    try {
      const paramUser = req.params
      const result = this._ctrl.deleteUser(paramUser)
      this._response.success(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }
}

export default UserRouter
