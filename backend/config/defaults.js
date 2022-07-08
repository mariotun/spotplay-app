import dotenv from 'dotenv'

dotenv.config()

export const config = {
  api: {
    port: process.env.PORT || 8000,
    hostname: process.env.HOSTNAME || 'localhost',
    name: process.env.NAMEAPP || 'app'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  dbMongo: {
    uri: process.env.MONGO_URI // || 'mongodb://0.0.0.0:27017/app'
  }
  /* ,
    db:{
        host: process.env.DB_HOST || 'localhost'
    } */
}
