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
      let token = window.localStorage.getItem('id_token');
      console.log(token);
      if (!token) {
        token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJURkdNekl5UlRsR1EwUkROalJCTlRWQlJUSkZRakk0TVRrMk1qYzNOVGczUlRKRk9Ua3lOUSJ9.eyJpc3MiOiJodHRwczovL2dyYXBocWwtbm9kZS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTcxNzYyMzU5NjgzMjQ5NTk1MzUiLCJhdWQiOiJJR0JUeWJReTdadnljRkJHMHdnUHk1N1hmc3RtRFNvTSIsImlhdCI6MTUzNTgxMDUzMywiZXhwIjoxNTM1ODQ2NTMzLCJhdF9oYXNoIjoiSFpPQjM5ekdBTDJZcU5tVUNCSV9FUSIsIm5vbmNlIjoiMjRfVXJmLnl1MlRJWXpEMmZGaVF5aWgxci1xeVJNSTQifQ.KcViJxTyiRTqLceNUZ_CSggdF3uk3bbNtCUk5eh3bs6DMn6_O56hgx8bgcZYc0ocNzn9aRwO_W188AzQbPt8s-B_dx4lpRwOg5M9IpRO487Ew0-lSXJvwCv63rx9AAV08331phhbfgf4NrPOQ2poxv8bHX5yMbhGuFD-rbmCypK_AwQ9MaCHsHCQxFT-i9-cHTn75qqfHzCnU3KF3ttpV9Cc0VjkeOIwg55MLG9WqGOIjTi0qKV9n8J7XJXyymett77KVolO1OSYnQ7L35Tw8w-kv4qVSeCN6mgAsVxxEECJ9pqCiAEEyPKyHyXU8ZtxSFn4LFpWyjsdD2_xk2zy3g"
      }
      return token;
    }
  }
}, {
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