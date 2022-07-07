import pg from 'pg'

export class DataPostgresql {
  constructor () {
    this._pool = this.getConnection()
  }

  async getConnection () {
    const pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'dbspotplay'
    })
    return pool
  }

  async save (table, data) {
    try {
      const query = `INSERT INTO ${table} (${Object.keys(data).join(',')}) VALUES (${Object.keys(data).map((current, index) => `$${index + 1}`).join(',')})`
      console.log(query)
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, Object.values(data))
      console.log(resultPool.rows)
      return resultPool
    } catch (error) {
      console.log('ERR_INSERT: ', error)
    }
  }

  async all (table) {
    try {
      const query = `SELECT * FROM ${table}`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      return resultPool
    } catch (error) {
      console.log('ERR_SELECT: ', error)
    }
  }

  async one (table, param) {
    try {
      const query = `SELECT * FROM ${table} WHERE _id = ${param.id};`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      return resultPool
    } catch (error) {
      console.log('ERR_SELECT_ONE: ', error)
    }
  }

  async update (table, param, data) {
    try {
      /* const query = [`UPDATE ${table}`]
      query.push('SET')
      const set = []
      Object.keys(data).forEach(function (key, i) {
        set.push(key + `= $${i + 1}`)
      })
      query.push(set.join(', '))
      query.push(`WHERE _id = ${param.id} ;`)
      console.log('>>>>>>>>>>>>>', query.join(' '))
      const colValues = Object.keys(data).map(function (key) {
        return data[key]
      })
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query.join(' '), colValues)
      return resultPool */

      const args = Object.values(data)
      const keys = Object.keys(data).join(',')
      const argKeys = Object.keys(data).map((obj, index) => {
        return '$' + (index + 1)
      }).join(',')
      const query = `UPDATE ${table} SET ( ${keys} ) = ( ${argKeys} ) WHERE _id = ${param.id}`
      console.log('>>>>>> ', query)
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, args)
      return resultPool
    } catch (error) {
      console.log('ERR_UPDATE: ', error)
    }
  }

  async delete (table, param) {
    try {
      const query = `DELETE FROM ${table} WHERE _id = ${param.id};`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      console.log(resultPool.rows)
      return resultPool
    } catch (error) {
      console.log('ERR_DELETE: ', error)
    }
  }

  async findByAtribute (table, attribute, value) {
    console.log(table, attribute, value)
    try {
      const query = `SELECT * FROM ${table} WHERE ${attribute} = $1`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, [value])
      console.log(resultPool.rows)
      return resultPool.rows[0]
    } catch (error) {
      console.log(error)
    }
  }
}
