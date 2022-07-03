/* import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'mocha'

chai.use(chaiHttp)
const url = 'http://localhost:4000/api/v1/song' */

/* describe('Create a new song: ', () => {
  it('should insert a song', (done) => {
    chai.request(url)
      .post('/')
      .send({
        title: 'songprueba',
        uri: 'www.songprueba.com',
        duration: 2,
        image: 'www.imagen.com',
        idArtist: 1,
        idGenero: 3
      })
      .end((err, res) => {
        // console.log(`RES: ${res.body} <> ERR: ${err}`)
        console.log('RES: ', res.body)
        console.log('ERR: ', err)
        chai.expect(res).to.have.status(201)
        done()
      })
  })
}) */

export class Metodos {
  constructor (url, chai, chaihttp, describe, it) {
    this._url = `http://localhost:4000/api/v1/${url}`
    this._chai = chai
    this._chaiHttp = chaihttp
    this._describe = describe
    this._it = it
    this._chai.use(this._chaiHttp)
  }

  postMethod (describe2, it2, endpoint, user) {
    this._describe(describe2, () => {
      this._it(it2, (done) => {
        this._chai.request(this._url)
          .post(endpoint)
          .send(user)
          .end((err, res) => {
            // console.log(`RES: ${res.body} <> ERR: ${err}`)
            console.log('RES: ', res.body)
            console.log('ERR: ', err)
            this._chai.expect(res).to.have.status(201)
            done()
          })
      })
    })
  }

  getMethod (describe2, it2, endpoint) {
    this._describe(describe2, () => {
      this._it(it2, (done) => {
        this._chai.request(this._url)
          .get(endpoint)
          .end((err, res) => {
            console.log('RES: ', res.body)
            console.log('ERR: ', err)
            this._chai.expect(res).to.have.status(202)
            done()
          })
      })
    })
  }

  deleteMethod (describe2, it2, endpoint) {
    this._describe(describe2, () => {
      this._it(it2, (done) => {
        this._chai.request(this._url)
          .del(endpoint)
          .end((err, res) => {
            console.log('RES: ', res.body)
            console.log('ERR: ', err)
            this._chai.expect(res).to.have.status(200)
            done()
          })
      })
    })
  }
}
