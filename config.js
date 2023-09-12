import admin from 'firebase-admin'

const firebase = {
  type: 'service_account',
  project_id: 'miakreditasi',
  private_key_id: '00e63c5c29b167d56b512341d3bd5fb824d00d55',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC465oo+sGZ8eQc\n2huVkdAITNY1X1Fu9wcU4E0cRQh/hvjrfFyKJWikF8z4s435H7xY5bjnUQOkCoz2\nSZSwibBG86RRkolkzrbd3Kt3Gsmrro80JsTVdaH8kO+EIFSsuuqwzVRaQD/vofxa\n27FHcvLrj+3z27YCEQ0rWqxLz5s8NR7Ug/pyvUKmuqiD/ujrz34xxtb0KfBmmarX\nB4rrjUj+i3lO7I/myHMmjR/7ZGJmjO2DEBtMMbJkg5uCvKnUxVPVtWpdd43Suw1y\nH+H8Nk2fgg8+jZIYMqMa7tzrzeWl8ObnrX2iMOzE2i3yxzz6vWXrT6YeQ6FGAn2u\nIDwhGQ0LAgMBAAECggEAAW23ut63dZNNhVfw0NBLEKPAH387t4U+CNzz8fN2+nE8\nmNxUyxZsTAdvcT5sRHZVZxE2dmCev0fIYs2BUhA5crR5wQDGTsD2eOYcoJnUemvD\nT6fuN/RY/es3hnt8QmD0fjNf4vPOUQrp0npFanCXZgpH6gasNDDiIdy19wuRpSUd\nwCHX1K8duLkZ0FGXn+0pG30d6r9IujoIS1SZ16ZGL0kp+63KWlbEKeNriJ1O+aQr\nBQpqq1xM4PmNG5F5vCkT9LaHNsBBdr6885zyojP3hqV8Gxis7jcRa18WZ5vdeE78\nrA8UXkp0dOaJLoVns78nDA5MWUTHbvL93vcIsFHwdQKBgQDeaPp6CYI5hjG8h3Sr\nTmrdMFWRPVirZbSE805CqTWSGi/LI81dDLZfH4HfDr3ttgZXyhC4FvVQJ3o7U6NX\n1+5R+5SO8qAu7/4EjF+VUPQrz+SJPIOKyFYJ7H6DTMfP/OWHX+sy1lgJ6hWnmPKT\nhkP8bpsDHDut15D/qPvKUubIBQKBgQDU2SklvPBm5sfaoi5Yji5bm7+KcoGlUgSw\nTIsH6uk3mElxXsKNJHBgc3WGlSezKP7K6RCF9MiTJTTRb19zCaAwUu5huRPWHNWP\nN5zhwNkzC9SPXyKJt+u/8XTcu452pz71BYiJGtCR4BSgG/LJIbnIIvvtmt5jHFEF\nTDs4pF3dzwKBgDtkc0b1lRYBdPSwg4JfjYAFsUP4yt3yafN6+bIpd4nNfmfT5rpr\nc6QRSOAlEqkRC76T0kUmtFm0QRroqd0CZ7zy3ugReJ8wLXhPeBLqrFmqyY+wXjxI\nZVl/EwXDEjTDhxPQlIFd5eK35RJ9cIHev/cAHlsFRhaVUz5ChQKxgrl1AoGBAKII\nq7Vp70021OAQ5N1PZ+UfXSJlZ2LWXHFl49VkNKS5Dvf6XnsaSV5zpv2MYMuYIteP\ns592qJa0FVB2y6AErOj8yTKltX8jNkSv3oNRz0d38xouH1neJN9bTk6Xja2wRlI7\nIyTUwAC9KJZ2kE4jmY3NbCIG6tNihB9XWCIXpsmrAoGADXdTiWLkaju78anzyNcl\ndag5rOu8VrkSv8rUEOSKd6DqB7wpekXiwHJjW0eFFfv0DiXaC9WOfZLN+tXFO2nt\ndsLu2ueF98SKJS/Q2esv51s5XRA35mpajsTqm2t7/61+BL5jlFshHd2jf/8wTJZD\nGDSp32aASi1OVxzmz1tUZ1w=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-ayb84@miakreditasi.iam.gserviceaccount.com',
  client_id: '108826326274537326973',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ayb84%40miakreditasi.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
}

admin.initializeApp({
  credential: admin.credential.cert(firebase),
  storageBucket: 'gs://miakreditasi.appspot.com'
})

export const storage = admin.storage()
