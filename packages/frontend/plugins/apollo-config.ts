export default (): any => {
  return {
    httpEndpoint: 'http://localhost:4000/',
    getAuth: () => {
      return 'VRCAuthCookie authcookie_my-static-token'
    },
  }
}
