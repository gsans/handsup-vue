import Vue from 'vue'
import AWSAppSyncClient from "aws-appsync"
import VueApollo from 'vue-apollo'
import appSyncConfig from './config'

Vue.use(VueApollo)

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    jwtToken: () => { 
      debugger;
      const token = window.localStorage.getItem('AppSyncOIDCKey'); 
      // eslint-disable-next-line
      console.log('token:', token);
      return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJURkdNekl5UlRsR1EwUkROalJCTlRWQlJUSkZRakk0TVRrMk1qYzNOVGczUlRKRk9Ua3lOUSJ9.eyJpc3MiOiJodHRwczovL2dyYXBocWwtbm9kZS5hdXRoMC5jb20vIiwic3ViIjoiSUdCVHliUXk3WnZ5Y0ZCRzB3Z1B5NTdYZnN0bURTb01AY2xpZW50cyIsImF1ZCI6ImFwcC1zeW5jLWF1dGgwIiwiaWF0IjoxNTM1NzEzOTM3LCJleHAiOjE1MzU4MDAzMzcsImF6cCI6IklHQlR5YlF5N1p2eWNGQkcwd2dQeTU3WGZzdG1EU29NIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.KPfsniQWUsmztWtqtYod0JHV26pXTDuDcFnNdmdz2l7i-FMvQgXdF984YtMdPIj57E2YBYqNvorD_cLUvHXvEfzRF0vW6bo064i3ICvihn5DVuafruYrJEl03P479kZfvJwrcMiOHqjR_dnK-7bs1w81oP8vetkPkrtoS29sKcbEziQ-Vq6TKRPhcDtw6Wocv9ZCBkI_NG7lMrQsG99XrsM62WI5ts4G-TT7YdxMkxZSNrSpWvZXy1aruV00VuG3rQPADak_YqWKaa8TC0QrSC9IgIoobWmEPhOMk3DN6C-_P1LpR39n4G5hv4b86u1C3dq3ChxQesDmBWcgxh7nBA";
    }
  }
},{
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    }
  }
})

//client.initQueryManager();
//client.resetStore();

export default new VueApollo({
  defaultClient: client
})