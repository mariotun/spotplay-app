class UserRouter {
  constructor (router, controller, response, httpcode) {
    this._router = router()// instancia del enrutador de express
    this._ctrl = controller
    this.registerRoutes()
    this._response = response
    this._httpcode = httpcode
  }

  registerRoutes () {
    // this._router.get('/singUp', this.handleGetSong.bind(this))
    this._router.post('/singUp', this.handleSingUp.bind(this))
    // this._router.put('/:id', this.handleUpdateSong.bind(this))
    // this._router.delete('/', this.handleDeleteSong.bind(this)) */
  }

  handleGetSong (req, res) {
    /* console.log(req)
      res.send('soy el manejador de la ruta get/song') */
    const result = this._ctrl.getAllSong()
    // res.send(resutl)
    this._response.success(req, res, result, this._httpcode.ACCEPTED)
  }

  handleSingUp (req, res) {
    // const song = req.body
    const result = this._ctrl.createNewUser(req.body)
    // res.send(result)
    this._response.success(req, res, result, this._httpcode.CREATED)
  }

  handleUpdateSong (req, res) {
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
  }
}

export default UserRouter
