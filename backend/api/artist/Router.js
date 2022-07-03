class ArtistRouter {
  constructor (router, controller, response, httpcode, createArtistValidation) {
    this._router = router()// instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpcode = httpcode
    this._chekArtist = createArtistValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetArtist.bind(this))
    this._router.post('/', this._chekArtist, this.handlePostArtist.bind(this))
    // this._router.put('/:id', this.handleUpdateSong.bind(this))
    this._router.delete('/:id', this.handleDeleteArtist.bind(this))
  }

  handlePostArtist (req, res) {
    const result = this._ctrl.createNewArtist(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.CREATED)
  }

  handleGetArtist (req, res) {
    try {
      const result = this._ctrl.getAllArtist()
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay artistas creados', this._httpCode.not_found)
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

  handleDeleteArtist (req, res) {
    try {
      const paramUser = req.params
      const result = this._ctrl.deleteArtist(paramUser)
      this._response.success(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }
}

export default ArtistRouter
