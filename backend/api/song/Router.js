class SongRouter {
  constructor (router, controller, response, httpcode, createSongValidation, chekToken) {
    this._router = router()// instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpcode = httpcode
    this._chekSong = createSongValidation
    this._ckekToken = chekToken
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this._ckekToken, this.handleGetSong.bind(this))
    this._router.get('/:id', this.handleGetOneSong.bind(this))
    this._router.post('/', this._chekSong, this.handlePostSong.bind(this))
    this._router.put('/:id', this.handleUpdateSong.bind(this))
    this._router.delete('/:id', this.handleDeleteSong.bind(this))
  }

  async handlePostSong (req, res) {
    const result = await this._ctrl.createNewSong(req.body)
    console.log('----> ', result)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.CREATED)
  }

  async handleGetSong (req, res) {
    try {
      const result = await this._ctrl.getAllSong()
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      // console.log('handle-->', result)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  async handleGetOneSong (req, res) {
    try {
      const result = await this._ctrl.getOneSong(req.params)
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      console.log(result)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  handleUpdateSong (req, res) {
    const result = this._ctrl.updateSong(req.params, req.body)
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleDeleteSong (req, res) {
    try {
      const paramUser = req.params
      const result = this._ctrl.deleteSong(paramUser)
      this._response.success(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }
}

export default SongRouter
