class GeneralController {
  constructor (table, serviceGeneral, general) {
    this._table = table
    this._service = serviceGeneral
    this._entity = general
  }

  createNewGeneral (general) {
    const newGeneral = new this._entity(general)
    const response = this._service.save(this._table, newGeneral)
    return response
  }

  async getAllGeneral () {
    const response = await this._service.all(this._table)
    return response
  }

  async getOneGeneral (idGeneral) {
    const response = await this._service.one(this._table, idGeneral)
    return response
  }

  updateGeneral (parametro, general) {
    const updateGeneral = new this._entity(general)
    const response = this._service.update(this._table, parametro, updateGeneral)
    return response
  }

  deleteGeneral (idGeneral) {
    const response = this._service.delete(this._table, idGeneral)
    return response
  }
}

export default GeneralController
