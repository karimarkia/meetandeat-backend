const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    try {
        const { email, password, username } = req.body
        // logger.debug(email + ", " + username)
        const account = await authService.signup(email, password, username)
        // logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const token = await authService.login(email, password)
        req.session.user = token
        console.log(req.session)
        res.status(200).send({ message: 'Signup success!', token })
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        await authService.logout(req.token)
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}