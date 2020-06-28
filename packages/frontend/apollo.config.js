module.exports = {
  client: {
    service: {
      name: 'pineapple-backend',
      url: 'http://localhost:4000/graphql',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    includes: [
      './app/**/*.gql',
    ],
  },
}
