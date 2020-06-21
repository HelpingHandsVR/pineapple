export default (context) => {
  return {
    httpEndpoint: 'http://decentm-vm-manjaro:4000/',
    getAuth: () => {
      return `VRCAuthCookie ${context.$apolloHelpers.getToken()}`
    },
  }
}
