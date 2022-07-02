import express from 'express'

const app = express()

const port = 3000

/* function contestadorRutas (req, res) {
  console.log(req)
  res.send('request recibido')
} */

app.get('/soyunaruta', (req, res) => {
  console.log(req)
  res.send('request recibido')
})

app.listen(port, function () {
  console.log('servidor iniciado')
})
