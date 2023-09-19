export default function capitalize (str) {
  const words = str.split(' ')

  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  // Join the words back together into a single string
  return capitalizedWords.join(' ')
}
