import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

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

const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb+srv://mipolitamaak:XWHsNxLgFDW1S1ah@cluster0.9phgxal.mongodb.net/?retryWrites=true&w=majority', {
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
app.use(cors({
  origin: ['http://localhost:5173', 'admin-akreditasi.my.id', 'admin-akreditasi.vercel.app', 'mipolitamaak.my.id']
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

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
