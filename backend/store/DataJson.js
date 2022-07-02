import fs from 'fs'

export class DataJson {
  constructor () {
    this._dataPath = './store/db.json'
    this.setTables()
  }

  setTables () {
    const tables = {
      user: [],
      song: [],
      artist: [],
      playlist: []
    }
    const items = this.readJsonFile()
    if (items.length === 0) {
      this.writeJsonFile(tables)
    }
  }

  readJsonFile () {
    const contentFile = fs.readFileSync(this._dataPath, 'utf8')
    if (contentFile) {
      return JSON.parse(contentFile)
    }
    return []
  }

  writeJsonFile (data) {
    const jsonData = JSON.stringify(data, null, '')
    fs.writeFileSync(this._dataPath, jsonData)
  }

  generatePK (table) {
    const lastItem = this.all(table).pop()
    if (lastItem) {
      return ++lastItem._id
    }
    return 1
    // const items = this.readJsonFile()
    // items[table].pop()
  }

  save (table, data) {
    const items = this.readJsonFile()
    data._id = this.generatePK(table)
    items[table].push(data)
    this.writeJsonFile(items)
    return 'ok'
  }

  delete (table, data) {
    const items = this.readJsonFile()
    const newData = items[table].filter(tbl => tbl._id !== parseInt(data.id))
    items[table] = newData
    this.writeJsonFile(items)
    return 'Data Deleted'
  }

  update (table, param, body) {
    // console.log('UPDATE-->: ', table, '---', param, '---', body)
    const items = this.readJsonFile()
    // const newData = items[table].filter(table => table !== param.id)
    console.log('>>>>> ', items[table]._id !== '1')
    // console.log('new: ', items)
  }

  checkAge (dato, id) {
    return dato._id === id
  }

  all (table) {
    const items = this.readJsonFile()
    return items[table] || []
  }
}

/* const data = new DataJson()
data.save('user', { id: null, name: 'nicolas', lastname: 'tun' })

const result = data.all('user')
console.table(result) */
