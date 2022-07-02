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
    this._router.post('/singup', this._chekUser, this.handleSingUp.bind(this))
    // this._router.put('/:id', this.handleUpdateSong.bind(this))
    this._router.delete('/:id', this.handleDeleteUser.bind(this))
  }

  handleSingUp (req, res) {
    const result = this._ctrl.createNewUser(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleGetUser (req, res) {
    try {
      const result = this._ctrl.getAllUser()
      this._response.success(req, res, result, this._httpcode.OK)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay canciones', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  /* handleUpdateSong (req, res) {
    const param = req.params
    const body = req.body
    // console.log(`parametro: ${param} body: ${body}`)
    const result = this._ctrl.updateSong(param, body)
    this._response.success(req, res, result, this._httpcode.OK)
    // console.log(req)
    // res.send('soy el manejador de la ruta put/song')
  } */

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
