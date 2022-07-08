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
    this._router.put('/:id', this.handleUpdateArtist.bind(this))
    this._router.delete('/:id', this.handleDeleteArtist.bind(this))
  }

  handlePostArtist (req, res) {
    const result = this._ctrl.createNewArtist(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.CREATED)
  }

  async handleGetArtist (req, res) {
    try {
      const result = await this._ctrl.getAllArtist()
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay artistas creados', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  handleUpdateArtist (req, res) {
    const result = this._ctrl.updateArtist(req.params, req.body)
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleDeleteArtist (req, res) {
    try {
      const paramArtist = req.params
      const result = this._ctrl.deleteArtist(paramArtist)
      this._response.success(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }
}

export default ArtistRouter
