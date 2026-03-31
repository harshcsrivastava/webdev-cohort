import express from "express"
import type {Express} from "express"
import { authRouter } from "./auth/routes.js"

export function createExpressApplication(): Express{
    const app = express()

    // Middlewares
    app.use(express.json())

    // routes
    app.get("/", (req, res) => {
        return res.json({message: 'Welcome to Auth Service'})
    })
    app.use('/auth', authRouter)

    return app;
}