const { handleAuth, handleLogin } = require("@auth0/nextjs-auth0");


export default handleAuth({
    signup: handleLogin({ authorizationParams: { screen_hint: 'signup' } })
})