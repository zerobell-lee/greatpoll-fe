const config = {
    host: 'http://greatpoll.line',
    clientId: '1571874884',
    authServer: undefined
}

config.authServer = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=" + config.clientId + "&redirect_uri="
config.authServer += (config.host + "/api/auth").replace(/:/gi, "%3A").replace(/\//gi, "%2F")
config.authServer += "&state=12345"
config.authServer += "&scope=profile%20openid%20email"

export default config;