import mongoose from 'mongoose'
// import { config } from '../config/defaults.js'
import { models } from './MongooseModel.js'

/* function conexion () {
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
  return mongodb
} */
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
    // conexion()
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
      const result = await models[table].find() // .populate('_idRole').populate('_idTypeCount')
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

  async findById (table, id) {
    try {
      const findById = await models[table].findById(id)
      if (findById) {
        return findById
      }
      return `no item of ${table}`
    } catch (error) {
      console.log(error)
      return `no item of ${table}`
    }
  }

  async findByAttribute (table, attribute, value) {
    try {
      const findByAttribute = await models[table].find({ [attribute]: value })
      if (findByAttribute.length > 0) {
        return findByAttribute
      }
      return `no item of ${table}`
    } catch (error) {
      console.log(error)
      return `no item of ${table}`
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

  async searchSongTitleAndArtist (title, artist) { // no se ha probado el metodo aun
    try {
      const searchSong = await this._models.Songs.find({
        _title: { $regex: title, $options: 'i' },
        _artist: { $regex: artist, $options: 'i' }
      })
      if (searchSong.length > 0) {
        return searchSong
      }
      return 'no item of Songs'
    } catch (error) {
      console.log(error)
      return 'no item of Songs'
    }
  }

  async searchSongString (search) {
    try {
      const searchSong = await this._models.Songs.find({ // no se ha probado el metodo aun
        $or: [
          { _title: { $regex: search, $options: 'i' } },
          { _artist: { $regex: search, $options: 'i' } },
          { _album: { $regex: search, $options: 'i' } }
        ]
      })
      if (searchSong.length > 0) {
        return searchSong
      }
      return 'no item of Songs'
    } catch (error) {
      console.log(error)
      return 'no item of Songs'
    }
  }
}
