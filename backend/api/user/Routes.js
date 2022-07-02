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
    // this._router.get('/singUp', this.handleGetSong.bind(this))
    this._router.post('/singup', this._chekUser, this.handleSingUp.bind(this))
    // this._router.put('/:id', this.handleUpdateSong.bind(this))
    // this._router.delete('/', this.handleDeleteSong.bind(this)) */
  }

  handleSingUp (req, res) {
    const result = this._ctrl.createNewUser(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleGetSong (req, res) {
    try {
      const result = this._ctrl.getAllSong()
      this._response.success(req, res, result, this._httpCode.ok)
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
  }

  handleDeleteSong (req, res) {
    const song = req.body
    // console.log('*****: ', song)
    const result = this._ctrl.deleteSong(song)
    this._response.success(req, res, result, this._httpcode.OK)
    // console.log(req)
    // res.send('soy el manejador de la ruta delete/song')
  } */
}

export default UserRouter
