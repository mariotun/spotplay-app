class PlaylistRouter {
  constructor (router, controller, response, httpcode, createPlaylistValidation) {
    this._router = router()// instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpcode = httpcode
    this._chekPlaylist = createPlaylistValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetPlaylist.bind(this))
    this._router.post('/', this._chekPlaylist, this.handlePostPlaylist.bind(this))
    // this._router.put('/:id', this.handleUpdateSong.bind(this))
    this._router.delete('/:id', this.handleDeletePlaylist.bind(this))
  }

  handlePostPlaylist (req, res) {
    const result = this._ctrl.createNewPlaylist(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleGetPlaylist (req, res) {
    try {
      const result = this._ctrl.getAllPlaylist()
      this._response.success(req, res, result, this._httpcode.OK)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay Playlist creados', this._httpCode.not_found)
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

  handleDeletePlaylist (req, res) {
    try {
      const paramPlaylist = req.params
      const result = this._ctrl.deletePlaylist(paramPlaylist)
      this._response.success(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }
}

export default PlaylistRouter
