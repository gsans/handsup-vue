import auth0 from 'auth0-js'
import router from './../router'
import EventEmitter from 'EventEmitter'

export default class AuthService {

  auth0 = new auth0.WebAuth({
    domain: 'graphql-node.auth0.com',
    clientID: 'IGBTybQy7ZvycFBG0wgPy57XfstmDSoM',
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://graphql-node.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  })
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor() {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
      }
    })
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    router.replace('home')
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}