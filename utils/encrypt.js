import crypto from 'crypto-js'

export default function encrypt (data, secretKey) {
  const encryptedData = crypto.AES.encrypt(JSON.stringify(data), secretKey).toString()
  return encryptedData
}
