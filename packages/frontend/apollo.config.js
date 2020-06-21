module.exports = {
  client: {
    service: {
      name: 'pineapple-backend',
      url: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    includes: [
      './app/**/*.gql',
    ],
  },
}
