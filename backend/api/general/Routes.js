class GeneralRouter {
  constructor (router, controller, response, httpcode) {
    this._router = router()// instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpcode = httpcode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetGeneral.bind(this))
    this._router.post('/', this.handlePostGeneral.bind(this))
    this._router.put('/:id', this.handleUpdateGeneral.bind(this))
    this._router.delete('/:id', this.handleDeleteGeneral.bind(this))
  }

  handlePostGeneral (req, res) {
    const result = this._ctrl.createNewGeneral(req.body)
    if (result instanceof Error) {
      this._response.error(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpcode.CREATED)
  }

  async handleGetGeneral (req, res) {
    try {
      const result = await this._ctrl.getAllGeneral()
      this._response.success(req, res, result, this._httpcode.ACCEPTED)
      // console.log('handle-->', result)
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.not_found)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }

  handleUpdateGeneral (req, res) {
    const result = this._ctrl.updateGeneral(req.params, req.body)
    this._response.success(req, res, result, this._httpcode.OK)
  }

  handleDeleteGeneral (req, res) {
    try {
      const paramUser = req.params
      const result = this._ctrl.deleteGeneral(paramUser)
      this._response.success(req, res, result, this._httpcode.OK)
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.internal_server_error)
    }
  }
}

export default GeneralRouter
