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

  /* delete (table, data) {
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
  } */

  update (table, data) {
    const items = this.readJsonFile()
    const newItems = items[table].filter(item => item._id !== data._id)
    newItems.push(data)
    items[table] = newItems
    this.writeJsonFile(items)
    return data
  }

  delete (table, data) {
    const items = this.readJsonFile()
    const itemDelete = items[table].find(item => item._id === data)
    itemDelete._status = 0
    this.writeJsonFile(items)
    return 'Delete item'
  }

  checkAge (dato, id) {
    return dato._id === id
  }

  all (table) {
    const items = this.readJsonFile()
    return items[table] || []
  }

  findByAtribute (table, atribute, value) {
    const items = this.readJsonFile()
    const item = items[table].find(item => item[atribute] === value)
    if (item) {
      return item
    }
    return null
  }
}

/* const data = new DataJson()
data.save('user', { id: null, name: 'nicolas', lastname: 'tun' })

const result = data.all('user')
console.table(result) */
