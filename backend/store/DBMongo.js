import mongoose from 'mongoose'
// import { config } from '../config/defaults.js'
import { models } from './MongooseModel.js'

const url = 'mongodb+srv://Mario:mdbMario123@cluster-spotplay.pxqospw.mongodb.net/spotplay?retryWrites=true&w=majority'
const mongodb = async () => {
  try {
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`-----> MongoDB connected: ${db.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export class DBMongo {
  constructor () {
    mongodb()
  }

  async save (table, data) {
    try {
      const newUser = models[table](data)
      await newUser.save()
      return `Created a new item at table ${table}`
    } catch (error) {
      console.log('ERR_SAVE_DB: ', error)
    }
  }

  async all (table) {
    try {
      const result = await models[table].find()
      return result
    } catch (error) {
      console.log('ERR_FIND_DB: ', error)
    }
  }

  async one (table, param) {
    try {
      const result = await models[table].findById(param.id)
      return result
    } catch (error) {
      console.log('ERR_FIND_BY_ID_DB: ', error)
    }
  }

  async update (table, param, data) {
    try {
      const result = await models[table].findByIdAndUpdate(param.id, data)
      return result
    } catch (error) {
      console.log('ERR_FIND_BY_ID_UPDATE_DB: ', error)
    }
  }

  async delete (table, param) {
    try {
      const result = await models[table].findByIdAndDelete(param.id)
      return result
    } catch (error) {
      console.log('ERR_FIND_BY_ID_DELETE_DB: ', error)
    }
  }
}
