import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://mipolitamaak:XWHsNxLgFDW1S1ah@cluster0.9phgxal.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Koneksi berhasil ngabs');
});

mongoose.connection.on('disconnected', () => {
  console.log('Koneksi terputus');
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Api Connected')
})

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});