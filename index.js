// Route Visitor
import routerVisitor from './routes/visitor.js'

// Routes Downloads
import routerBpk from './routes/downloads/bpk.js'
import routerKontrakKuliah from './routes/downloads/kontrak-kuliah.js'
import routerPengabdian from './routes/downloads/pengabdian.js'
import routerRps from './routes/downloads/rps.js'
import routerPenelitian from './routes/downloads/penelitian.js'
import routerSertifikat from './routes/downloads/sertifikat.js'

// Routes Dokumen jurusan
import routerKurikulum from './routes/dokumen-jurusan/kurikulum.js'
import routerKaryaMahasiswa from './routes/dokumen-jurusan/karya-mahasiswa.js'

// Route Dokumen mahasiswa
import routerMakrab from './routes/dokumen-mahasiswa/makrab.js'
import routerMagang from './routes/dokumen-mahasiswa/magang.js'
import routerSosialisasi from './routes/dokumen-mahasiswa/sosialisasi.js'
import routerSeminar from './routes/dokumen-mahasiswa/seminar.js'
import routerWebinar from './routes/dokumen-mahasiswa/webinar.js'
import routerTurnamen from './routes/dokumen-mahasiswa/turnamen.js'
import routerHmj from './routes/dokumen-mahasiswa/hmj.js'

// Route Sarana Prasarana
import routerSaranaPrasarana from './routes/sarana-prasarana.js'
// Route Sarana Prasarana Perpustakaan
import routerSaranaPrasaranaPerpustakaan from './routes/sarana-prasarana-perpustakaan.js'

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

let app = null

if (!app) {
  app = express()
}

const port = process.env.PORT || 3000

// mongoose.connect('mongodb+srv://mipolitamaak:XWHsNxLgFDW1S1ah@cluster0.9phgxal.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

mongoose.connect('mongodb://127.0.0.1:27017/akreditasimi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Koneksi berhasil ngabs skuy kita mabar bersama kodok terbang')
})

mongoose.connection.on('disconnected', () => {
  console.log('Koneksi terputus')
})

app.use(bodyParser.json())

app.use(cors({
  origin: '*'
}))

app.use('/api', routerVisitor)

// Routes Downloads
app.use('/api', routerBpk)
app.use('/api', routerKontrakKuliah)
app.use('/api', routerPengabdian)
app.use('/api', routerRps)
app.use('/api', routerPenelitian)
app.use('/api', routerSertifikat)

// Routes Dokumen Jurusan
app.use('/api', routerKurikulum)
app.use('/api', routerKaryaMahasiswa)

// Routes Dokumen Mahasiswa
app.use('/api', routerMakrab)
app.use('/api', routerMagang)
app.use('/api', routerSosialisasi)
app.use('/api', routerSeminar)
app.use('/api', routerWebinar)
app.use('/api', routerTurnamen)
app.use('/api', routerHmj)

// Routes Sarana Prasarana
app.use('/api', routerSaranaPrasarana)

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
