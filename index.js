import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import routerVisitor from './routes/visitor.js'

// Routes Downloads
import routerBpk from './routes/downloads/bpk.js'

const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017/akreditasimi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Koneksi berhasil ngabs skuy kita mabar bersama kodok terbang dan mister raul')
})

mongoose.connection.on('disconnected', () => {
  console.log('Koneksi terputus')
})

app.use(bodyParser.json())

app.use('/api', routerVisitor)
app.use('/api', routerBpk)

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
