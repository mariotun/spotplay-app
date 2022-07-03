import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'mocha'

import { Metodos } from './Metodos.js'

const user = {
  title: 'songprueba',
  uri: 'www.songprueba.com',
  duration: 2,
  image: 'www.imagen.com',
  idArtist: 1,
  idGenero: 3
}

const testSong = new Metodos('song', chai, chaiHttp, describe, it)
testSong.postMethod('Create a new song: ', 'should insert a song', '/', user)
// testSong.getMethod('Get all songs: ', 'should get all songs', '/')
// testSong.deleteMethod('Delete the song using id: ', 'should delete the song with id=4', '/4')
