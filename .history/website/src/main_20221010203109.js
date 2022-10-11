import awilix from 'awilix';
const container = awilix.createContainer()

container.register({
    userManager: awilix.asFunction(('./business-logic-layer/user-manager.js')),
    commentManager: awilix.asFunction(require('./business-logic-layer/comment-manager.js')),
    feedbackManager: awilix.asFunction(require('./business-logic-layer/feedback-manager.js')),

    userRepository: awilix.asFunction(require('./data-access-layer/user-table.js')),
    commentRepository: awilix.asFunction(require('./data-access-layer/comment-table.js')),
    feedbackRepository: awilix.asFunction(require('./data-access-layer/feedback-table.js')),

    variusRouter: awilix.asFunction(require('./presentation-layer/routers/varius-router')),
    userRouter: awilix.asFunction(require('./presentation-layer/routers/user-router')),
    feedbackRouter: awilix.asFunction(require('./presentation-layer/routers/feedback-router')),
    commentRouter: awilix.asFunction(require('./presentation-layer/routers/comment-router')),

    appGUI: awilix.asFunction(require('./presentation-layer/app')),

    app: awilix.asFunction(require('./app'))
})

const app = container.resolve("app")

app.listen(8000,function(){
    console.log("Running on 8000!")
})

