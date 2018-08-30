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
    apiKey: appSyncConfig.apiKey,
  }
},{
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    }
  }
})

export default new VueApollo({
  defaultClient: client
})