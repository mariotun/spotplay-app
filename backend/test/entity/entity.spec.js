import { expect } from 'chai'
import { describe, it } from 'mocha'
import Song from '../../entity/Song.js'

// escribiendo un test
describe('testing song class', () => {
  const song = new Song({
    title: 'title',
    uri: 'uri',
    duration: 'duration',
    image: 'image',
    idArtist: 'idArtist',
    idGenero: 'idGenero'
  })

  it('should is not null', () => {
    expect(song).to.not.equal(null)
  })

  it('should have a title', () => {
    expect(song._title).to.equal('title')
  })

  it('should return a number', () => {
    const result = song.returNumber()
    expect(result).to.equal(5)
  })
})
