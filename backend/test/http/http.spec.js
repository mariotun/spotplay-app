import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'mocha'
import { Metodos } from './Metodos.js'

const song = {
  title: 'songprueba',
  uri: 'www.songprueba.com',
  duration: 2,
  image: 'www.imagen.com',
  idArtist: 1,
  idGenero: 3
}
const user = {
  id: null,
  username: 'userprueba',
  email: 'userprueba@gmail.com',
  password: 'userpruebagt'
}

const artist = {
  id: null,
  firstname: 'firstnprueba',
  lastname: 'lastlprueba',
  avatar: 'www.prueba.com',
  country: 'mexico',
  birthday: '1985-06-25'
}

const playlist = {
  id: null,
  name: 'clasicas prueba',
  avatar: 'www.clsprueba.com',
  duration: '17'
}

const testSong = new Metodos('song', chai, chaiHttp, describe, it)
// testSong.postMethod('Create a new song: ', 'should insert a song', '/', song)
testSong.getMethod('Get all songs: ', 'should get all songs', '/')
// testSong.deleteMethod('Delete the song using id: ', 'should delete the song with id=4', '/4')

const testUser = new Metodos('user', chai, chaiHttp, describe, it)
// testUser.postMethod('Create a new user: ', 'should insert an user ', '/singup', user)
testUser.getMethod('Get all users: ', 'should get all users', '/')
// testUser.deleteMethod('Delete the user using id: ', 'should delete the user with id=3', '/3')

const testArtist = new Metodos('artist', chai, chaiHttp, describe, it)
// testArtist.postMethod('Create a new artist: ', 'should insert an artist', '/', artist)
testArtist.getMethod('Get all artists: ', 'should get all artists', '/')
// testArtist.deleteMethod('Delete the artist using id: ', 'should delete the artist with id=3', '/3')

const testPlaylist = new Metodos('playlist', chai, chaiHttp, describe, it)
// testPlaylist.postMethod('Create a new playlist: ', 'should insert a playlist', '/', playlist)
testPlaylist.getMethod('Get all playlists: ', 'should get all playlists', '/')
// testPlaylist.deleteMethod('Delete the playlist using id: ', 'should delete the playlist with id=6', '/6')
