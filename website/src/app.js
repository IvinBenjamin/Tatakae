const express = require("express")

module.exports = function({appGUI}){
    const app = express()

    app.use('/',appGUI)

    return app
}

